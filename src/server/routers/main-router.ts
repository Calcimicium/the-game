import * as Express from "express"
import * as path from "path"
import signInRouter from "./sign-in-router"
import playersRouter from "./players-router"

const clientDir = path.resolve(__dirname, "../client")
const indexFile = path.join(clientDir, "index.html")
const mappings: RouterMapping[] = [
	{ path: "/players", router: playersRouter },
	{ path: "/sign-in", router: signInRouter }
]

const mainRouter = Express.Router()

mappings.forEach(m => mainRouter.use(m.path, m.router))
mainRouter.get("/*", (req, res, next) => res.sendFile(indexFile))

export default mainRouter

interface RouterMapping {
	path: string;
	router: Express.Router;
}
