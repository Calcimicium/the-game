import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./components/app"

window.onload = () => {
	ReactDOM.render(<App />, document.getElementById("app"))
}
