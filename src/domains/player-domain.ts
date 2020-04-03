import Player from "models/player"
import { PlayerResponseBody } from "bodies/response-bodies"

export function getPublicName(player: Player): string {
	return `${player.nickname}#${player.id}`
}

export function setPublicName(player: Player): void {
	player.publicName = getPublicName(player)
}

export function toResponseBody(player: Player): PlayerResponseBody {
	return {
		id: player.id,
		nickname: player.nickname,
		publicName: player.publicName
	}
}

export function toPlayer(responseBody: PlayerResponseBody): Player {
	const player = new Player
	player.id = responseBody.id
	player.nickname = responseBody.nickname
	player.publicName = responseBody.publicName
	return player
}
