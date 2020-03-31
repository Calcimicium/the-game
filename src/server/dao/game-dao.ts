import BaseDao from "./base-dao"
import pool from "./pool"
import Game from "../../models/game"

export class GameDao extends BaseDao<Game> {
	async create(model: Game): Promise<void> {
		throw new Error("Method not implemented.")
	}

	delete(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}

	async findById(id: number): Promise<Game | null> {
		throw new Error("Method not implemented.")
	}

	async find(limit?: number, offset?: number): Promise<Game[]> {
		const res = await pool.query("SELECT * FROM game")
		console.log("res", res)
		return [new Game]
	}

	async update(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}
}

export const gameDao = new GameDao(pool)
