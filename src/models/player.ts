import BaseModel from "./base-model"

export default class Player extends BaseModel {
	get nickname(): string | null { return this._nickname }
	set nickname(value: string | null) { this._nickname = value }

	get publicName(): string | null { return this._publicName }
	set publicName(value: string | null) { this._publicName = value }

	private _nickname: string | null = null
	private _publicName: string | null = null
}
