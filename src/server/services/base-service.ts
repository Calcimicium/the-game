import BaseDao from "server/dao/base-dao"
import BaseModel from "models/base-model"

export default abstract class BaseService<
	TModel extends BaseModel,
	TDao extends BaseDao<TModel>
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
		await this.dao.closeConnection()
	}

	abstract async create(model: TModel): Promise<void>
	abstract async delete(model: TModel): Promise<void>
	abstract async findById(id: TModel["id"]): Promise<TModel | null>
	abstract async find(limit?: number, offset?: number): Promise<TModel[]>
	abstract async update(model: TModel): Promise<void>

	private _dao: TDao
}
