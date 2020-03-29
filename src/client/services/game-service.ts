import { BaseService } from "client/services/base-service"
import webSocket from "client/websocket"
import Game from "models/game"

export class GameService extends BaseService<Game> {
	get(): void {
		this.sendMessage({
			endpoint: "games",
			method: "get"
		})
	}
}

export const gameService = new GameService(webSocket)
