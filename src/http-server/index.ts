import * as express from "express"
import * as path from "path"
import * as WebSocket from "ws"

const clientDir = path.resolve(__dirname, "../client")

const server = express()
.use("/", express.static(clientDir))
.listen(process.env.PORT, () => {
	console.log("Listening on port", process.env.PORT)
})

const wss = new WebSocket.Server({ server })

wss.on("connection", ws => {
	console.log("Client connected", ws)
	ws.on("close", () => console.log("Client disconnected", ws))
})
