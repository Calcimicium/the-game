import * as express from "express"
import * as fs from "fs"
import * as path from "path"
import * as WebSocket from "ws"
import { DEFAULT_PORT, Env, getWsAddress, ENV_TEMPLATE } from "env"

const clientDir = path.resolve(__dirname, "../client")
const indexFile = path.join(clientDir, "index.html")
const indexContent = fs.readFileSync(indexFile, "utf8")
const port = process.env.PORT || DEFAULT_PORT

const server = express()
.set("trust proxy", true)
.use("/css", express.static(path.join(clientDir, "css")))
.use("/js", express.static(path.join(clientDir, "js")))
.get("/*", (req, res, next) => {
	const wsAddress = getWsAddress(req.hostname, port, isSecured(req))
	const env: Env = { wsAddress }
	res.send(indexContent.replace(ENV_TEMPLATE, JSON.stringify(env)))
})
.listen(port, () => {
	console.log("Listening on port", port)
})

const wss = new WebSocket.Server({ server })

wss.on("connection", ws => {
	console.log("Client connected", ws)
	ws.on("close", () => console.log("Client disconnected", ws))
})

function isSecured(req: express.Request): boolean {
	return req.protocol === "https"
}
