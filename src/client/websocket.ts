import { Env } from "../env"

declare const __env__: Env

export default new WebSocket(__env__.wsAddress)
