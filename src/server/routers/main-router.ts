import * as Express from "express"
import * as path from "path"
import signInRouter from "./sign-in-router"

const clientDir = path.resolve(__dirname, "../client")
const indexFile = path.join(clientDir, "index.html")
const mappings: RouterMapping[] = [
	{ path: "/sign-in", router: signInRouter }
]

const mainRouter = Express.Router()

mainRouter.get("/*", (req, res, next) => res.sendFile(indexFile))
mappings.forEach(m => mainRouter.use(m.path, m.router))

export default mainRouter

interface RouterMapping {
	path: string;
	router: Express.Router;
}
