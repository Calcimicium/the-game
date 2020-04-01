import * as express from "express"
import * as PlayerDomain from "domains/player-domain"
import Player from "models/player"
import { playerService } from "server/services/player-service"

const signInRouter = express.Router()

signInRouter.post("/", (req, res, next) => {
	if (!req.body.nickname)
		return res.status(422).send("The nickname is required.")

	const player = new Player()
	player.nickname = req.body.nickname

	playerService.create(player)
	.then(() => {
		if (req.session) req.session.playerId = player.id

		return res.status(201).send(PlayerDomain.toResponseBody(player))
	})
	.catch(reason => {
		console.error(reason)
		res.sendStatus(500)
	})
})

export default signInRouter
