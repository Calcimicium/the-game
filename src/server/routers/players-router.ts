import * as Express from "express"
import * as PlayerDomain from "domains/player-domain"
import { playerService } from "server/services/player-service"

const playerRouter = Express.Router()

playerRouter.get("/me", (req, res, next) => {
	if (!req.session || !req.session.playerId) return res.sendStatus(404)

	playerService.findById(req.session.playerId)
	.then(player => {
		if (!player) return res.sendStatus(404)
		res.send(PlayerDomain.toResponseBody(player))
	})
	.catch(reason => {
		console.error(reason)
		res.sendStatus(500)
	})
})

export default playerRouter
