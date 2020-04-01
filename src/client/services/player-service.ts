import Player from "models/player"
import { BaseService } from "./base-service"

export class PlayerService extends BaseService<Player> {
	get(): Promise<Player[]> {
		throw new Error("Method not implemented.")
	}
}

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
