import BaseDao from "./base-dao"
import client from "./client"
import Player from "models/player"

export class PlayerDao extends BaseDao<Player> {
	create(model: Player): Promise<void> {
		throw new Error("Method not implemented.")
	}
	delete(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}
	findById(id: number): Promise<Player | null> {
		throw new Error("Method not implemented.")
	}
	find(limit?: number, offset?: number): Promise<Player[]> {
		throw new Error("Method not implemented.")
	}
	update(id: number): Promise<void> {
		throw new Error("Method not implemented.")
	}
}

export const playerDao = new PlayerDao(client)
