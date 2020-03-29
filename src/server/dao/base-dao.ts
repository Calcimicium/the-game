import * as pg from "pg"
import { BaseModel } from "../../models/base-model"

export default abstract class BaseDao<TModel extends BaseModel<TKey>, TKey> {
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
	abstract async delete(id: TKey): Promise<void>
	abstract async findById(id: TKey): Promise<TModel | null>
	abstract async find(limit?: number, offset?: number): Promise<TModel[]>
	abstract async update(id: TKey): Promise<void>

	private _client: pg.Client
}
