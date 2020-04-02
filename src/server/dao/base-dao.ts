import * as pg from "pg"
import BaseModel from "models/base-model"

export default abstract class BaseDao<TModel extends BaseModel> {
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

	abstract async create(model: TModel): Promise<void>
	abstract async delete(id: TModel["id"]): Promise<void>
	abstract async findById(id: TModel["id"]): Promise<TModel | null>
	abstract async find(limit?: number, offset?: number): Promise<TModel[]>
	abstract async update(id: TModel["id"]): Promise<void>

	private _client: pg.PoolClient | null = null
	private _pool: pg.Pool
}
