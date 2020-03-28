import Env from "./env"

declare const __env__: Env

const host = __env__.WS_HOST || "localhost"
const port = __env__.WS_PORT || 8888
const address = `ws://${host}:${port}`

export default new WebSocket(address)
