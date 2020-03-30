import * as Dotenv from "dotenv"
import * as fs from "fs"
import * as path from "path"
import * as pg from "pg"
import Migration from "./migration"

Dotenv.config()

const migrationsDir = path.resolve(__dirname, "migrations")

console.info("Looking for migration files...")

const migrationFiles = fs.readdirSync(migrationsDir, { withFileTypes: true })
.filter(f => path.extname(f.name) === ".sql")
.sort((f1, f2) => f1.name > f2.name ? 1 : -1)

if (!migrationFiles.length) {
	console.info("No migration found.")
	process.exit()
} else {
	console.group("Migration files found:")
	migrationFiles.forEach(f => console.info(f.name))
	console.groupEnd()
}

const client = new pg.Client({ connectionString: process.env.DATABASE_URL })

client.connect()
.then(() => handleResolveClientConnect(client))
.catch(reason => handleRejectConnect(reason))

async function applyMigration(
	file: fs.Dirent,
	client: pg.Client
): Promise<void> {
	console.info()
	console.info(`Applying migration ${file.name}...`)

	const fullFileName = path.join(migrationsDir, file.name)
	const migrationQuery = fs.readFileSync(fullFileName, "utf8")

	console.info("Migration query:", migrationQuery)

	console.info("Executing migration query...")
	await client.query(migrationQuery)
	console.info("Migration executed.")

	const insertMigrationQuery = `insert into migration (code, query)
	values ($1, $2)`
	const migrationCode = parseInt(path.basename(file.name, ".sql"))

	console.info("Saving migration to database...")
	await client.query(insertMigrationQuery, [migrationCode, migrationQuery])
	console.info(`Migration ${file.name} saved to database.`)
}

async function applyMigrations(
	files: fs.Dirent[],
	client: pg.Client
): Promise<void> {
	try {
		console.info()
		console.group(`Migrations required`)
		files.forEach(f => console.info(f.name))
		console.groupEnd()

		console.info()
		console.group("Starting migration transaction...")
		await client.query("begin")

		for (const file of files) await applyMigration(file, client)

		console.info("Commiting transaction...")
		await client.query("commit")
		console.info("Transaction commited.")

		console.groupEnd()

		console.info()
		console.info("Migrations succeeded.")

		process.exit()
	} catch (error) {
		console.groupEnd()

		console.error("Transaction failed.", error)

		console.info("Rollbacking transaction...")
		await client.query("rollback")
		console.info("Transaction rollbacked.")

		process.exit(1)
	}
}

async function createMigrationTableIfNotExists(
	client: pg.Client
): Promise<void> {
	const query = `create table if not exists migration (
		id serial constraint pk_migration primary key,
		code bigint constraint uq_migration_code unique,
		query text
	)`

	await client.query(query)
}

function findNewerMigrationFiles(
	migration: Migration,
	files: fs.Dirent[]
): fs.Dirent[] {
	return files.filter(f => parseInt(path.basename(f.name, ".sql")) > migration.code)
}

function handleRejectClientEnd(reason: any): void {
	console.info()
	console.error("Connection closure failed.", reason)
	process.exit(1)
}

function handleRejectConnect(reason: any): void {
	console.info()
	console.error("Connection to database failed.", reason)
	process.exit(1)
}

function handleRejectCreateTable(reason: any, client: pg.Client): void {
	console.info()
	console.error("Creation of migration table failed.", reason)
	client.end()
	.then(() => process.exit(1))
	.catch(reason => handleRejectClientEnd(reason))
}

function handleRejectFindLastMigration(reason: any, client: pg.Client): void {
	console.info()
	console.error("Querying last saved migration in database failed.", reason)
	client.end()
	.then(() => process.exit(1))
	.catch(reason => handleRejectClientEnd(reason))
}

function handleResolveClientConnect(client: pg.Client): void {
	createMigrationTableIfNotExists(client)
	.then(() => handleResolveCreateTable(client))
	.catch(reason => handleRejectCreateTable(reason, client))
}

function handleResolveCreateTable(client: pg.Client): void {
	console.info()
	console.info("Querying last saved migration...")

	queryLastMigration(client)
	.then(migration => handleResolveFindLastMigration(migration, client))
	.catch(reason => handleRejectFindLastMigration(reason, client))
}

function handleResolveFindLastMigration(
	migration: Migration | null,
	client: pg.Client
): void {
	let newerMigrationsFiles: fs.Dirent[]

	if (!migration) {
		console.info("No migration found in database.")
		newerMigrationsFiles = [...migrationFiles]
	} else {
		console.info(`Migration ${migration.code} is the last one saved in database.`)
		console.info()
		console.info("Looking for newer migration files...")

		newerMigrationsFiles = findNewerMigrationFiles(migration, migrationFiles)
	}

	if (newerMigrationsFiles.length === 0) {
		console.info(`No migration newer files found.`)
		console.info()
		console.info("Database is up to date.")
		process.exit()
	}

	applyMigrations(newerMigrationsFiles, client)
}

async function queryLastMigration(client: pg.Client): Promise<Migration | null> {
	const query = "select * from migration order by code desc limit 1"
	const res = await client.query(query)

	if (res.rowCount === 0) return null

	const migration = new Migration()
	migration.id = res.rows[0].id
	migration.code = parseInt(res.rows[0].code)
	migration.query = res.rows[0].query

	return migration
}
