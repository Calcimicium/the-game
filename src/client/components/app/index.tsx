import * as React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Games from "client/components/games"
import SignIn from "client/components/sign-in"
import Env from "client/env"

declare const __env__: Env

export class App extends React.Component<Props> {
	constructor(props: Readonly<Props>) {
		super(props)
		const host = __env__.WS_HOST || "localhost"
		const port = __env__.WS_PORT || 3000
		const address = `ws://${host}:${port}`

		this.webSocket = new WebSocket(address)
		this.webSocket.onopen = function(e) {
			console.info("WebSocket connexion open", this)
		}
		this.webSocket.onerror = function(e) {
			console.error("WebSocket error", e)
		}
	}

	render() {
		return <Router>
			<Route path="/" render={() => {
				if (!localStorage.getItem("nickname"))
					return <Redirect to="/sign-in"/>

				return <Redirect to="/games"/>
			}}/>

			<Route path="/sign-in" render={props =>
				<SignIn {...props} webSocket={this.webSocket}/>}/>

			<Route path="/games" render={props =>
				<Games {...props} webSocket={this.webSocket}/>}/>

			<Route />
		</Router>
	}

	private webSocket: WebSocket
}

interface Props {}
