import * as React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Games from "client/components/games"
import SignIn from "client/components/sign-in"
import * as PlayerService from "client/services/player-service"
import Player from "models/player"

export class App extends React.Component<Props, State> {
	constructor(props: Readonly<Props>) {
		super(props)
		this.state = { loading: true }
	}

	componentDidMount() {
		if (this.player) return

		this.setState({ loading: true })
			PlayerService.findMe()
			.then(player => this.resolveFindMe(player))
			.catch(reason => this.rejectFindMe(reason))
	}

	render() {
		if (this.state.loading) return <div>Loading...</div>

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

	private rejectFindMe(reason: any): void {
		console.error(reason)
		this.setState({ loading: false })
	}

	private resolveFindMe(player: Player | null): void {
		this.player = player
		this.setState({ loading: false })
	}

	private player: Player | null = null
}

interface Props {}

interface State {
	loading: boolean;
}
