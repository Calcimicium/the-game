import BaseService from "server/services/base-service"
import * as playerDomain from "domains/player-domain"
import Player from "models/player"
import { PlayerDao, playerDao } from "server/dao/player-dao"

export class PlayerService extends BaseService<Player, PlayerDao> {
	async create(player: Player): Promise<void> {
		await this.connect()
		await this.dao.create(player)
		playerDomain.setPublicName(player)
		await this.end()
	}

	async delete(model: Player): Promise<void> {
		throw new Error("Method not implemented.")
	}

	async findById(id: number): Promise<Player | null> {
		throw new Error("Method not implemented.")
	}

	async find(limit?: number, offset?: number): Promise<Player[]> {
		throw new Error("Method not implemented.")
	}

	async update(model: Player): Promise<void> {
		throw new Error("Method not implemented.")
	}
}

export const playerService = new PlayerService(playerDao)
