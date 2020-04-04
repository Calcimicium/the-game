import BaseService from "server/services/base-service"
import * as PlayerDomain from "domains/player-domain"
import Player from "models/player"
import {
	PlayerDao,
	playerDao,
	PlayerResultRow,
	PlayerCreateParams
} from "server/dao/player-dao"

export class PlayerService
extends BaseService<Player, PlayerResultRow, PlayerCreateParams, PlayerDao> {
	protected createFromResultRow(resultRow: PlayerResultRow): Player {
		const player = new Player
		this.updateFromResultRow(player, resultRow)
		return player
	}

	protected getCreateParams(player: Player): PlayerCreateParams {
		return { nickname: player.nickname }
	}

	protected getUpdateParams(player: Player): Partial<PlayerCreateParams> {
		return { nickname: player.nickname }
	}

	protected updateFromResultRow(
		player: Player,
		resultRow: PlayerResultRow
	): void {
		player.id = resultRow.id
		player.nickname = resultRow.nickname
		PlayerDomain.setPublicName(player)
	}
}

export const playerService = new PlayerService(playerDao)
