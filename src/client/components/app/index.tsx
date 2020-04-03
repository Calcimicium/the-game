import * as React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Games from "client/components/games"
import SignIn from "client/components/sign-in"
import SplashScreen from "client/components/splash-screen"
import * as PlayerService from "client/services/player-service"
import Player from "models/player"
import "./style.scss"

export class App extends React.Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props)
		this.state = {
			fetchingPlayer: false,
			playerFetchRequired: true,
			showSplashScreen: true
		}
	}

	componentDidMount() {
		if (!this.state.showSplashScreen) return this.fetchPlayerIfRequired()
		setTimeout(() => this.fetchPlayerIfRequired(), 2000)
	}

	componentDidUpdate() {
		this.fetchPlayerIfRequired()
	}

	render() {
		if (this.state.showSplashScreen)
			return <SplashScreen loading={this.state.fetchingPlayer}/>

		return <Router>
			<Route path="/" render={() => {
				if (this.player) return <Redirect to="/games"/>
				return <Redirect to="/sign-in"/>
			}}/>

			<Route path="/sign-in" render={props => <SignIn {...props}/>}/>

			<Route path="/games" render={props => <Games {...props}/>}/>

			<Route />
		</Router>
	}

	private fetchPlayerIfRequired(): void {
		if (this.player) return
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

	private rejectFindMe(reason: any): void {
		console.error(reason)
		this.setState({
			fetchingPlayer: false,
			playerFetchRequired: false,
			showSplashScreen: false
		})
	}

	private resolveFindMe(player: Player | null): void {
		this.player = player
		this.setState({
			fetchingPlayer: false,
			playerFetchRequired: false,
			showSplashScreen: false
		})
	}

	private player: Player | null = null
}

interface Props {}

interface State {
	fetchingPlayer: boolean;
	playerFetchRequired: boolean;
	showSplashScreen: boolean;
}
