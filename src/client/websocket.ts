import { Env, DEFAULT_HOST, DEFAULT_PORT } from "../env"

declare const __env__: Env

const host = __env__.HOST || DEFAULT_HOST
const port = __env__.PORT || DEFAULT_PORT
const address = `ws://${host}:${port}`

export default new WebSocket(address)
