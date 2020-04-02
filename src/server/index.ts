import cookieSession = require("cookie-session")
import * as Express from "express"
import * as http from "http"
import * as KeyGrip from "keygrip"
import * as net from "net"
import * as path from "path"
import * as WebSocket from "ws"
import dispatchMessage from "./message-handlers/dispatch-message"
import apiRouter from "./routers/api-router"

const clientDir = path.resolve(__dirname, "../client")
const indexFile = path.join(clientDir, "index.html")
const port = process.env.PORT

if (!port) {
	console.error(
		"Configuration error:",
		"PORT environment variable must be defined.\n"
	)
	process.exit(1)
}

const secretKey1 = process.env.SECRET_KEY_2
const secretKey2 = process.env.SECRET_KEY_1
const secretKey3 = process.env.SECRET_KEY_3

if (!secretKey1 || !secretKey2 || !secretKey3) {
	console.error(
		"Configuration error:",
		"All of SECRET_KEY_2, SECRET_KEY_1 or SECRET_KEY_3 environement variables must be defined.\n"
	)
	process.exit(1)
}

const keys = [secretKey1, secretKey2, secretKey3]
const keyGrip = KeyGrip(keys, "sha256", "hex")
const sessionMiddleware = cookieSession({ keys: keyGrip, name: "session" })

const app = Express()
.set("trust proxy", true)
.use("/", httpsRedirection)
.use("/css", Express.static(path.join(clientDir, "css")))
.use("/js", Express.static(path.join(clientDir, "js")))
.use(sessionMiddleware)
.use(Express.json())
.use("/api", apiRouter)
.get("/*", (req, res, next) => res.sendFile(indexFile))

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
