import BaseDao, { BaseResultRow } from "./base-dao"
import pool from "./pool"
import Player from "models/player"

export class PlayerDao
extends BaseDao<Player, PlayerResultRow, PlayerCreateParams> {
	get tableName(): string { return "player" }
}

export const playerDao = new PlayerDao(pool)

export interface PlayerResultRow extends BaseResultRow<Player> {
	nickname: Player["nickname"];
}

export interface PlayerCreateParams {
	nickname: Player["nickname"];
}
