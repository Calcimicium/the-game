import * as BaseService from "./base-service"
import * as ReqBodies from "bodies/request-bodies"
import * as ResBodies from "bodies/response-bodies"

export async function createGame(
	maxPlayers: number,
	pass?: string
): Promise<ResBodies.GameResponseBody> {
	const body: ReqBodies.CreateGameRequestBody = { maxPlayers }
	if (pass) body.pass = pass

	return BaseService.post("/games", body)
}
