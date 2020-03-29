import * as express from "express"
import * as fs from "fs"
import * as path from "path"
import * as WebSocket from "ws"
import { DEFAULT_PORT, Env, getWsAddress, ENV_TEMPLATE } from "env"
import handleMessage from "./handlers/message-handler"

const clientDir = path.resolve(__dirname, "../client")
const indexFile = path.join(clientDir, "index.html")
const indexContent = fs.readFileSync(indexFile, "utf8")
const port = process.env.PORT || DEFAULT_PORT
const clientPort = process.env.NODE_ENV !== "production" ? port : undefined

const server = express()
.set("trust proxy", true)
.use("/css", express.static(path.join(clientDir, "css")))
.use("/js", express.static(path.join(clientDir, "js")))
.get("/*", (req, res, next) => {
	const wsAddress = getWsAddress(req.hostname, clientPort, isSecured(req))
	const env: Env = { wsAddress }
	res.send(indexContent.replace(ENV_TEMPLATE, JSON.stringify(env)))
})
.listen(port, () => {
	console.log("Listening on port", port)
})

const wss = new WebSocket.Server({ server })

wss.on("connection", ws => {
	console.log("New client connected")

	wss.clients.forEach(c => {
		if (c === ws || c.readyState !== WebSocket.OPEN) return

		c.send(JSON.stringify(new Message("lorem", "hello world")))
	})

	ws.on("message", handleMessage)

	ws.on("close", () => console.log("Client disconnected"))
})

setInterval(() => {
	wss.clients.forEach(c => c.send(new Date().toString()))
}, 1000)

function isSecured(req: express.Request): boolean {
	return req.protocol === "https"
}

class Message<TBody> {
	constructor(id: string, body: TBody) {
		this._id = id
		this._body = body
	}

	get body(): TBody {
		return this._body
	}

	get id(): string {
		return this._id
	}

	private _body: TBody
	private _id: string
}
