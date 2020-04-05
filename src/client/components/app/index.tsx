import * as React from "react"
import * as Rr from "react-router-dom"
import Auth from "client/components/auth"
import Games from "client/components/games"
import Home from "client/components/home"
import Players from "client/components/players"
import SignIn from "client/components/sign-in"
import * as PlayerService from "client/services/player-service"
import createWebSocket from "client/websocket/create-websocket"
import Player from "models/player"
import "./style.scss"

export class App extends React.Component<{}, State> {
	constructor(props: Readonly<{}>) {
		super(props)

		this.state = {
			fetchingPlayer: false,
			player: null,
			playerFetchRequired: true
		}
	}

	componentDidMount() {
		this.fetchPlayerIfRequired()
	}

	componentDidUpdate() {
		this.fetchPlayerIfRequired()
	}

	render() {
		return <Rr.BrowserRouter>
			<Rr.Switch>
				<Rr.Route exact path="/sign-in" render={props =>
					<SignIn
					{...props}
					player={this.state.player}
					onSignIn={p => this.handleSignIn(p)}/>
				}/>

				<Rr.Route exact path="/" render={props =>
					<Auth {...props} player={this.state.player}>
						<Home/>
					</Auth>
				}/>

				<Rr.Route exact path="/games" render={props =>
					<Auth {...props} player={this.state.player}>
						<Games/>
					</Auth>
				}/>

				<Rr.Route exact path="/players" render={props =>
					<Auth {...props} player={this.state.player}>
						<Players/>
					</Auth>
				}/>

			</Rr.Switch>
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

	private fetchPlayerIfRequired(): void {
		if (this.state.player) return
		if (this.state.fetchingPlayer) return
		if (!this.state.playerFetchRequired) return

		return this.forceFetchPlayer()
	}

	private forceFetchPlayer(): void {
		this.setState({ fetchingPlayer: true }, () => {
			PlayerService.findMe()
			.then(player => this.resolveFindMe(player))
			.catch(reason => this.rejectFindMe(reason))
		})
	}

	private handleSignIn(player: Player): void {
		this.setState({ player })
	}

	private rejectFindMe(reason: any): void {
		console.error(reason)
		this.setState({
			fetchingPlayer: false,
			playerFetchRequired: false
		})
	}

	private resolveFindMe(player: Player | null): void {
		this.setState({
			fetchingPlayer: false,
			player,
			playerFetchRequired: false
		})
	}

	private _webSocket: WebSocket | null = null
}

interface State {
	fetchingPlayer: boolean;
	player: Player | null;
	playerFetchRequired: boolean;
}
