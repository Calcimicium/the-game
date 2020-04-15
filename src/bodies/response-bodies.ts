import Player from "models/player"
import Game from "models/game"

export interface GameResponseBody {
	id: Game["id"];
	maxPlayers: Game["maxPlayers"];
	pass: Game["pass"];
	players: Player["id"][];
}

export interface PlayerResponseBody {
	id: Player["id"];
	nickname: Player["nickname"];
	publicName: Player["publicName"];
}
