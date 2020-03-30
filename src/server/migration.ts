export default class Migration {
	get id(): number { return this._id }
	set id(value: number) { this._id = value }

	get code(): number { return this._code }
	set code(value: number) { this._code = value }

	get query(): string | null { return this._query }
	set query(value: string | null) { this._query = value }

	private _id: number = 0
	private _code: number = 0
	private _query: string | null = null
}
