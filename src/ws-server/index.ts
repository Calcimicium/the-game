import * as serialize from "serialize-javascript"
import * as Websocket from "ws"
import { gameService } from "./services/game-service"

const port = process.env.WS_PORT ? parseInt(process.env.WS_PORT) : 8888
const server = new Websocket.Server({ port })

server.on("connection", ws => {
	ws.on("message", message => {
		console.log(message)
	})

	let i = 0

	setInterval(() => {
		server.clients.forEach(c => {
			c.send(`message ${i}`)
		})
		i++
	}, 500)

	sendGames(ws)
})

function sendGames(ws: Websocket) {
	gameService.find()
	.then(games => ws.send('Hello world 2'))
}
