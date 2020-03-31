import BaseDao from "./base-dao"
import pool from "./pool"
import Player from "models/player"

export class PlayerDao extends BaseDao<Player> {
	async create(player: Player): Promise<void> {
		if (!this.client)
			throw new Error("The pool must be connected before querying.")

		const query = "insert into player (nickname) values ($1) returning *"
		const res = await this.client.query(query, [player.nickname])
		player.id = res.rows[0].id
	}

	async delete(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}

	async findById(id: number): Promise<Player | null> {
		throw new Error("Method not implemented.")
	}

	async find(limit?: number, offset?: number): Promise<Player[]> {
		throw new Error("Method not implemented.")
	}

	async update(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}
}

export const playerDao = new PlayerDao(pool)
