import * as React from "react"
import * as Rr from "react-router-dom"
import Auth from "client/components/auth"
import Games from "client/components/games"
import GameCreator from "client/components/game-creator"
import Home from "client/components/home"
import Players from "client/components/players"
import createWebSocket from "client/websocket/create-websocket"
import "./style.scss"

export class App extends React.Component {
	render() {
		return <Rr.BrowserRouter>
			<Rr.Route render={props =>
				<Auth {...props}>
					<Rr.Switch>
						<Rr.Route exact path="/" render={p => <Home/>}/>
						<Rr.Route exact path="/games" render={p => <Games/>}/>
						<Rr.Route exact path="/games/create" render={p => <GameCreator/>}/>
						<Rr.Route exact path="/players" render={p => <Players/>}/>
					</Rr.Switch>
				</Auth>
			}/>
		</Rr.BrowserRouter>
	}

	get webSocket(): WebSocket {
		if (!this._webSocket) return createWebSocket()

		if (this._webSocket.readyState === this._webSocket.CLOSED)
			return createWebSocket()

		if (this._webSocket.readyState === this._webSocket.CLOSING)
			return createWebSocket()

		return this._webSocket
	}

	private _webSocket: WebSocket | null = null
}
