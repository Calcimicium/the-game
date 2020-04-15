import Player from "models/player"
import Game from "models/game";

export interface SignInRequestBody {
	nickname: Player["nickname"];
}

export interface CreateGameRequestBody {
	maxPlayers: Game["maxPlayers"];
	pass?: Game["pass"];
}
