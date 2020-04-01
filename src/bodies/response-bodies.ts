import Player from "models/player";

export interface PlayerResponseBody {
	id: Player["id"];
	nickname: Player["nickname"];
	publicName: Player["publicName"];
}
