import * as express from "express"
import * as path from "path"
import * as WebSocket from "ws"
import { DEFAULT_PORT } from "env"

const PORT = process.env.PORT || DEFAULT_PORT
const clientDir = path.resolve(__dirname, "../client")

console.log("__dirname", __dirname)
console.log("clientDir", clientDir)

const server = express()
.use("/", express.static(clientDir))
.get("/*", (req, res, next) => {
	res.sendFile(path.join(clientDir, "index.html"))
})
.listen(PORT, () => {
	console.log("Listening on port", PORT)
})

const wss = new WebSocket.Server({ server })

wss.on("connection", ws => {
	console.log("Client connected", ws)
	ws.on("close", () => console.log("Client disconnected", ws))
})
