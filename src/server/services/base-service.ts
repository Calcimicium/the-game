import BaseDao, { BaseResultRow } from "server/dao/base-dao"
import BaseModel from "models/base-model"

export default abstract class BaseService<
	TModel extends BaseModel,
	TResultRow extends BaseResultRow<TModel>,
	TCreateParams extends object,
	TDao extends BaseDao<TModel, TResultRow, TCreateParams>
> {
	constructor(dao: TDao) {
		this._dao = dao
	}

	get dao(): TDao { return this._dao }

	async create(model: TModel): Promise<void> {
		await this.dao.openConnection()
		const resultRow = await this.dao.create(this.getCreateParams(model))
		this.dao.closeConnection()

		this.updateFromResultRow(model, resultRow)
	}

	async delete(model: TModel): Promise<void> {
		await this.dao.openConnection()
		await this.dao.delete(model.id)
		this.dao.closeConnection()
	}

	async findById(id: TModel["id"]): Promise<TModel | null> {
		await this.dao.openConnection()
		const resultRow = await this.dao.findById(id)
		this.dao.closeConnection()

		return resultRow && this.createFromResultRow(resultRow)
	}

	async find(limit?: number, offset?: number): Promise<TModel[]> {
		await this.dao.openConnection()
		const resultRows = await this.dao.find(limit, offset)
		this.dao.closeConnection()

		return resultRows.map(r => this.createFromResultRow(r))
	}

	async update(model: TModel): Promise<void> {
		await this.dao.openConnection()
		const resultRow = await this.dao.update(model.id, this.getUpdateParams(model))
		this.dao.closeConnection()

		this.updateFromResultRow(model, resultRow)
	}


	protected abstract createFromResultRow(resultRow: TResultRow): TModel
	protected abstract getCreateParams(model: TModel): TCreateParams
	protected abstract getUpdateParams(model: TModel): Partial<TCreateParams>
	protected abstract updateFromResultRow(
		model: TModel,
		resultRow: TResultRow
	): void

	private _dao: TDao
}
