import Player from "./player"
import { BaseModel } from "./base-model"

export default class Game extends BaseModel<number> {
	constructor() {
		super()
		this._players = []
	}

	get players(): Player[] {
		return this._players
	}

	addPlayer(player: Player[]): this {
		this._players.push(player)
		return this
	}

	removePlayer(player: Player): this {
		const index = this._players.findIndex(p => player === p)

		if (index !== -1) this._players.splice(index, 1)

		return this
	}

	private _players: Player[]
}
