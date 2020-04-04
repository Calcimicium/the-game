import BaseService from "./base-service"
import Game from "../../models/game"
import {
	gameDao,
	GameDao,
	GameResultRow,
	GameCreateParams
} from "../dao/game-dao"

export class GameService
extends BaseService<Game, GameResultRow, GameCreateParams, GameDao> {
	protected createFromResultRow(resultRow: GameResultRow): Game {
		const game = new Game
		this.updateFromResultRow(game, resultRow)
		return game
	}

	protected getCreateParams(game: Game): GameCreateParams {
		return { max_players: game.maxPlayers }
	}

	protected getUpdateParams(game: Game): Partial<GameCreateParams> {
		return { max_players: game.maxPlayers }
	}

	protected updateFromResultRow(game: Game, resultRow: GameResultRow): void {
		game.id = resultRow.id
		game.maxPlayers = resultRow.max_players
	}
}

export const gameService = new GameService(gameDao)
