import * as React from "react"
import * as Rr from "react-router-dom"
import Games from "client/components/games"
import GameCreator from "client/components/game-creator"
import Home from "client/components/home"
import Players from "client/components/players"
import SignIn from "client/components/sign-in"
import createWebSocket from "client/websocket/create-websocket"
import * as PlayerService from "client/services/player-service"
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
		if (!this.state.player)
			return <SignIn onSignIn={p => this.handleSignIn(p)}/>

		return <Rr.BrowserRouter>
			<Rr.Switch>
				<Rr.Route exact path="/" render={p => <Home {...p} websocket={this.webSocket}/>}/>
				<Rr.Route exact path="/games" render={p => <Games {...p} websocket={this.webSocket}/>}/>
				<Rr.Route exact path="/games/create" render={p => <GameCreator {...p} websocket={this.webSocket}/>}/>
				<Rr.Route exact path="/players" render={p => <Players {...p} websocket={this.webSocket}/>}/>
			</Rr.Switch>
		</Rr.BrowserRouter>
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

interface State {
	fetchingPlayer: boolean;
	player: Player | null;
	playerFetchRequired: boolean;
}
