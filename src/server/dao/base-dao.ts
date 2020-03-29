import * as pg from "pg"
import BaseModel from "models/base-model"

export default abstract class BaseDao<TModel extends BaseModel> {
	constructor(client: pg.Client) {
		this._client = client
	}

	get client(): pg.Client {
		return this._client
	}

	async connect(): Promise<void> {
		await this.client.connect()
	}

	async end(): Promise<void> {
		await this.client.end()
	}

	abstract async create(model: TModel): Promise<void>
	abstract async delete(id: TModel["id"]): Promise<void>
	abstract async findById(id: TModel["id"]): Promise<TModel | null>
	abstract async find(limit?: number, offset?: number): Promise<TModel[]>
	abstract async update(id: TModel["id"]): Promise<void>

	private _client: pg.Client
}
