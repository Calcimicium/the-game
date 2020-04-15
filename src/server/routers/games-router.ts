import * as Express from "express"
import * as GameDomain from "domains/game-domain"
import { gameService } from "server/services/game-service"
import { playerService } from "server/services/player-service"

const gamesRouter = Express.Router()

gamesRouter.post("/", (req, res, next) => {
	if (!req.session || !req.session.playerId) return res.sendStatus(401)

	playerService.findById(req.session.playerId)
	.then(async player => {
		if (player) {
			const game = GameDomain.createGameFromReqBody(req.body, player)
			await gameService.create(game)
			res.json(GameDomain.createResBodyFromGame(game))
		} else res.sendStatus(401)
	})
	.catch(reason => {
		console.error(reason)
		res.sendStatus(500)
	})
})

export default gamesRouter
