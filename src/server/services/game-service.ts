import BaseService from "./base-service"
import Game from "../../models/game"
import { gameDao, GameDao } from "../dao/game-dao"

export class GameService extends BaseService<Game, GameDao> {
	async find(limit?: number, offset?: number): Promise<Game[]> {
		return [
			new Game(),
			new Game(),
			new Game(),
			new Game(),
		]
		this.connect()
		const games = await this.dao.find()
		this.end()

		return games
	}

	async findById(id: number): Promise<Game | null> {
		throw new Error("Method not implemented.")
	}

	async create(model: Game): Promise<void> {
		throw new Error("Method not implemented.")
	}

	async delete(model: Game): Promise<void> {
		throw new Error("Method not implemented.")
	}

	async update(model: Game): Promise<void> {
		throw new Error("Method not implemented.")
	}
}

export const gameService = new GameService(gameDao)
