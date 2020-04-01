import * as Dotenv from "dotenv"
Dotenv.config()

import cookieSession = require("cookie-session")
import * as Express from "express"
import * as fs from "fs"
import * as http from "http"
import * as KeyGrip from "keygrip"
import * as net from "net"
import * as path from "path"
import * as WebSocket from "ws"
import { DEFAULT_PORT, Env, getWsAddress, ENV_TEMPLATE } from "env"
import dispatchMessage from "./message-handlers/dispatch-message"
import signInRouter from "./routers/sign-in-router"

const clientDir = path.resolve(__dirname, "../client")
const indexFile = path.join(clientDir, "index.html")
const indexContent = fs.readFileSync(indexFile, "utf8")
const port = process.env.PORT || DEFAULT_PORT
const clientPort = process.env.NODE_ENV !== "production" ? port : undefined

const keys = [
	"2+&mbTy*DvV_AGdxb&hk7*kbcS#4$V!M",
	"v_pLJ-7CmFebNLW7^uHHw=r*6y-*sZNZ",
	"b$2zfMQ79LLjZj?BE5v=y9_JzTH!^ctZ"
]
const keyGrip = KeyGrip(keys, "sha256", "hex")
const sessionMiddleware = cookieSession({ keys: keyGrip, name: "session" })

const app = Express()
.set("trust proxy", true)
.use("/", httpsRedirection)
.use("/css", Express.static(path.join(clientDir, "css")))
.use("/js", Express.static(path.join(clientDir, "js")))
.use(sessionMiddleware)
.use(Express.json())
.use("/sign-in", signInRouter)

.delete("/sign-out", (req, res, next) => {
	next()
})

.get("/*", (req, res, next) => {
	const wsAddress = getWsAddress(req.hostname, clientPort, isSecured(req))
	const env: Env = { wsAddress }
	res.send(indexContent.replace(ENV_TEMPLATE, JSON.stringify(env)))
})

const server = http.createServer(app)
const wss = new WebSocket.Server({ noServer: true })

server.on("upgrade", (
	req: Express.Request,
	socket: net.Socket,
	head: Buffer
) => {
	sessionMiddleware(req, {} as Express.Response, () => {
		if (!req.session?.player) return socket.destroy()

		wss.handleUpgrade(req, socket, head, ws => {
			wss.emit("connection", ws, req)
		})
	})
})

wss.on("connection", (ws, req: Express.Request) => {
	console.log("Session player", req.session?.player)

	console.log("New client connected")

	wss.clients.forEach(c => {
		if (c === ws || c.readyState !== WebSocket.OPEN) return

		//TODO
	})

	ws.on("message", dispatchMessage)

	ws.on("close", () => console.log("Client disconnected"))
})

server.listen(port, () => {
	console.log("Listening on port", port)
})

function httpsRedirection(
	req: Express.Request,
	res: Express.Response,
	next: Express.NextFunction
): void {
	if (!isSecured(req) && process.env.HTTPS)
		return res.redirect(`https://${req.hostname}${req.originalUrl}`)

	next()
}

function isSecured(req: Express.Request): boolean {
	return req.protocol === "https"
}
