import BaseDao from "./base-dao"
import pool from "./pool"
import Player from "models/player"

export class PlayerDao extends BaseDao<Player> {
	async create(player: Player): Promise<void> {
		const query = "insert into player (nickname) values ($1) returning *"
		const res = await this.client.query(query, [player.nickname])
		player.id = res.rows[0].id
	}

	async delete(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}

	async findById(id: number): Promise<Player | null> {
		const query = "select * from player where id = $1"
		const res = await this.client.query(query, [id])

		if (!res.rowCount) return null

		const player = new Player
		player.id = res.rows[0].id
		player.nickname = res.rows[0].nickname

		return player
	}

	async find(limit?: number, offset?: number): Promise<Player[]> {
		throw new Error("Method not implemented.")
	}

	async update(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}
}

export const playerDao = new PlayerDao(pool)
