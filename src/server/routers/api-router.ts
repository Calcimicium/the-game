import * as Express from "express"
import gamesRouter from "./games-router"
import playersRouter from "./players-router"
import signInRouter from "./sign-in-router"

const mappings: RouterMapping[] = [
	{ path: "/games", router: gamesRouter },
	{ path: "/players", router: playersRouter },
	{ path: "/sign-in", router: signInRouter }
]

const mainRouter = Express.Router()

mappings.forEach(m => mainRouter.use(m.path, m.router))

export default mainRouter

interface RouterMapping {
	path: string;
	router: Express.Router;
}
