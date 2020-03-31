import Player from "models/player"

export function getPublicName(player: Player): string {
	return `${player.nickname}#${player.id}`
}

export function setPublicName(player: Player): void {
	player.publicName = getPublicName(player)
}
