import BaseDao, { BaseResultRow } from "./base-dao"
import pool from "./pool"
import Game from "models/game"
import Player from "models/player"

export class GameDao extends BaseDao<Game, GameResultRow, GameCreateParams> {
	get tableName(): string { return "game" }
}

export const gameDao = new GameDao(pool)

export interface GameResultRow extends BaseResultRow<Game> {
	max_players: number;
}

export interface GameCreateParams {
	creator: Player["id"];
	max_players: Game["maxPlayers"];
	pass: Game["pass"];
}
