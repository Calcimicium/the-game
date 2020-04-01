import * as ResBodies from "bodies/response-bodies"
import * as ReqBodies from "bodies/request-bodies"
import * as BaseService from "./base-service"

export function signIn(
	nickname: string
): Promise<ResBodies.PlayerResponseBody> {
	const body: ReqBodies.SignInRequestBody = { nickname }

	return BaseService.post("/sign-in", body)
}
