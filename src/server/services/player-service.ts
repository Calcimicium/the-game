import BaseService from "server/services/base-service"
import Player from "models/player"
import { PlayerDao, playerDao } from "server/dao/player-dao"

export class PlayerService extends BaseService<Player, PlayerDao> {
	create(model: Player): Promise<void> {
		throw new Error("Method not implemented.")
	}
	delete(model: Player): Promise<void> {
		throw new Error("Method not implemented.")
	}
	findById(id: number): Promise<Player | null> {
		throw new Error("Method not implemented.")
	}
	find(limit?: number, offset?: number): Promise<Player[]> {
		throw new Error("Method not implemented.")
	}
	update(model: Player): Promise<void> {
		throw new Error("Method not implemented.")
	}

}

export const playerService = new PlayerService(playerDao)
