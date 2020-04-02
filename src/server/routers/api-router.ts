import * as Express from "express"
import signInRouter from "./sign-in-router"
import playersRouter from "./players-router"

const mappings: RouterMapping[] = [
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
