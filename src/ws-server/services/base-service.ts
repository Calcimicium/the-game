import BaseDao from "../dao/base-dao"
import { BaseModel } from "../../models/base-model"

export default abstract class BaseService<
	TModel extends BaseModel<TKey>,
	TKey,
	TDao extends BaseDao<TModel, TKey>
> {
	constructor(dao: TDao) {
		this._dao = dao
	}

	get dao(): TDao {
		return this._dao
	}

	protected async connect(): Promise<void> {
		await this.dao.connect()
	}

	protected async end(): Promise<void> {
		await this.dao.end()
	}

	abstract async create(model: TModel): Promise<void>
	abstract async delete(model: TModel): Promise<void>
	abstract async findById(id: TKey): Promise<TModel | null>
	abstract async find(limit?: number, offset?: number): Promise<TModel[]>
	abstract async update(model: TModel): Promise<void>

	private _dao: TDao
}
