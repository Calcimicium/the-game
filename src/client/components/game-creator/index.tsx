import * as React from "react"
import * as Rr from "react-router-dom"
import * as ResBodies from "bodies/response-bodies"
import Input from "client/components/input"
import * as GameService from "client/services/game-service"
import * as GameDomain from "domains/game-domain"
import Game from "models/game"

const ids = {
	maxPlayer: "create-game-max-players",
	pass: "create-game-pass"
}

const names = {
	maxPlayers: "create-game-max-players",
	pass: "create-game-pass"
}

class GameCreator extends React.Component<InjectedProps, State> {
	constructor(props: Readonly<InjectedProps>) {
		super(props)
		this.state = { game: null, maxPlayers: GameDomain.DEFAULT_MAX_PLAYERS }
	}

	render() {
		if (this.state.game)
			return <Rr.Redirect to={`/games/${this.state.game.id}`}/>

		return <form onSubmit={e => this.handleSubmit(e)}>
			<Input
			id={ids.maxPlayer}
			label="Max players"
			max={GameDomain.MAX_PLAYERS}
			min={GameDomain.MIN_PLAYERS}
			name={names.pass}
			required
			type="number"
			value={this.state.maxPlayers}
			onChange={e => this.handleInputChange(e)}/>

			<Input
			id={ids.pass}
			label="Password (optional)"
			name={names.pass}
			type="password"
			value={this.state.pass}
			onChange={e => this.handleInputChange(e)}/>

			<Input type="submit" value="Create the game"/>
		</form>
	}

	private handleInputChange(e: React.ChangeEvent<HTMLInputElement>): void {
		switch (e.target.name) {
			case names.maxPlayers:
				return this.setState({ maxPlayers: e.target.valueAsNumber })
			case names.pass:
				if (e.target.value.trim() !== "")
					return this.setState({ pass: e.target.value })
		}
	}

	private handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault()

		GameService.createGame(this.state.maxPlayers, this.state.pass)
		.then(gameResBody => this.resolveCreateGame(gameResBody))
		.catch(reason => this.rejectCreateGame(reason))
	}

	private rejectCreateGame(reason: any): void {
		console.error(reason)
	}

	private resolveCreateGame(gameResBody: ResBodies.GameResponseBody): void {
		const game: Game = GameDomain.createGameFromResBody(gameResBody)
		this.setState({ game })
	}
}

export default Rr.withRouter(GameCreator)

interface Props {
	websocket: WebSocket;
}

interface State {
	game: Game | null;
	maxPlayers: number;
	pass?: string;
}

type InjectedProps = Props & Rr.RouteComponentProps
