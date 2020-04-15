import * as ResBodies from "bodies/response-bodies"
import * as ReqBodies from "bodies/request-bodies"
import Game from "models/game"
import Player from "models/player"

export const MAX_PLAYERS = 5
export const MIN_PLAYERS = 1
export const DEFAULT_MAX_PLAYERS = MIN_PLAYERS

export function createGameFromReqBody(
	requestBody: ReqBodies.CreateGameRequestBody,
	creator: Player
): Game {
	const game = new Game()
	game.maxPlayers = requestBody.maxPlayers
	game.creator = creator
	if (requestBody.pass) game.pass = requestBody.pass
	return game
}

export function createGameFromResBody(
	responseBody: ResBodies.GameResponseBody
): Game {
	const game = new Game()
	game.id = responseBody.id
	game.maxPlayers = responseBody.maxPlayers
	game.pass = responseBody.pass
	return game
}

export function createResBodyFromGame(game: Game): ResBodies.GameResponseBody {
	return {
		id: game.id,
		maxPlayers: game.maxPlayers,
		pass: game.pass,
		players: game.players.map(p => p.id)
	}
}
