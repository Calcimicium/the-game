import * as React from "react"
import * as Rr from "react-router-dom"
import SignIn from "client/components/sign-in"
import * as PlayerService from "client/services/player-service"
import Player from "models/player"

export default class Auth extends React.Component<InjectedProps, State> {
	constructor(props: Readonly<InjectedProps>) {
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
		if (this.state.player) return this.props.children
		return <SignIn onSignIn={p => this.handleSignIn(p)}/>
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
}

interface Props {}

interface State {
	fetchingPlayer: boolean;
	player: Player | null;
	playerFetchRequired: boolean;
}

type InjectedProps = Props & Rr.RouteComponentProps
