import * as pg from "pg"
import BaseModel from "models/base-model"

export default
abstract class BaseDao<
	TModel extends BaseModel,
	TResultRow extends BaseResultRow<TModel>,
	TCreateParams extends object
> {
	constructor(pool: pg.Pool) {
		this._pool = pool
	}

	get client(): pg.PoolClient {
		if (!this._client)
			throw new Error("The pool must be connected before using the client.")

		return this._client
	}

	closeConnection(): void {
		if (this._client) this._client.release()
		this._client = null
	}

	async openConnection(): Promise<void> {
		this._client = await this._pool.connect()
	}

	async create(params: TCreateParams): Promise<TResultRow> {
		const keys = Object.keys(params) as (keyof TCreateParams)[]
		const columns: (keyof TCreateParams)[] = []
		const placeholders: string[] = []
		const values: any[] = []

		keys.forEach((k, i) => {
			columns.push(k)
			placeholders.push(`$${i + 1}`)
			values.push(params[k])
		})

		const query = `insert into ${this.tableName} (${columns.join()})
		values (${placeholders.join()}) returning *`

		const res = await this.client.query(query, values)

		return res.rows[0]
	}

	async delete(id: TModel["id"]): Promise<void> {
		const query = `delete from ${this.tableName} where id = $1`
		await this.client.query(query, [id])
	}

	async findById(id: TModel["id"]): Promise<TResultRow | null> {
		const query = `select * from ${this.tableName} where id = $1`
		const res = await this.client.query(query, [id])

		if (!res.rowCount) return null

		return res.rows[0]
	}

	async find(limit?: number, offset?: number): Promise<TResultRow[]>{
		let query = `select * from ${this.tableName}`
		let params: number[] = []

		if (limit && offset) {
			query += " limit $1 offset $2"
			params.push(limit, offset)
		} else if (limit && !offset) {
			query += " limit $1"
			params.push(limit)
		} else if (!limit && offset) {
			query += " offset $1"
			params.push(offset)
		}

		return (await this.client.query(query, params)).rows
	}

	async update(
		id: TModel["id"],
		params: Partial<TCreateParams>
	): Promise<TResultRow> {
		const keys = Object.keys(params) as (keyof TCreateParams)[]
		const sets: string[] = []
		const values: any[] = [id]

		keys.forEach((k, i) => {
			sets.push(`${k} = $${i + 2}`)
			values.push(params[k])
		})

		const query = `update ${this.tableName}
		set ${sets.join()} where id = $1
		returning *`

		return (await this.client.query(query, values)).rows[0]
	}

	abstract tableName: string

	private _client: pg.PoolClient | null = null
	private _pool: pg.Pool
}

export interface BaseResultRow<TModel extends BaseModel> {
	id: TModel["id"];
}
