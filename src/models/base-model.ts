export abstract class BaseModel<TKey> implements Model<TKey> {
	get id(): TKey | null {
		return this._id
	}

	set id(value: TKey | null) {
		this._id = value
	}

	private _id: TKey | null = null
}

export interface Model<TKey> {
	id: TKey | null
}
