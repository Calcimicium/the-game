import Player from "models/player"
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

export function findMe(): Promise<Player|null> {
	return BaseService.get("/players/me")
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
