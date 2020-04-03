import Player from "models/player"
import { PlayerResponseBody } from "bodies/response-bodies"
import * as PlayerDomain from "domains/player-domain"
import * as BaseService from "./base-service"

export class NicknameError extends Error {
	constructor(code: NicknameErrorCode, message?: string) {
		super(message)
		this._code = code
	}

	get code(): NicknameErrorCode {
		return this._code
	}

	private _code: NicknameErrorCode
}

export async function findMe(): Promise<Player | null> {
	const playerResBody = await BaseService.get<PlayerResponseBody>("/players/me")
	return PlayerDomain.toPlayer(playerResBody)
}

export function validateNickname(
	nickname: string | undefined,
	callback: NicknameValidationCallback
): void {
	if (!nickname || nickname.trim() === "")
		return callback(new NicknameError(NicknameErrorCode.Empty))

	callback()
}

export interface NicknameValidationCallback {
	(err?: NicknameError): void;
}

export enum NicknameErrorCode {
	Empty
}
