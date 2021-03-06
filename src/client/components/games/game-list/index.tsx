import * as React from "react"
import { RouteComponentProps } from "react-router-dom"
import Input from "client/components/input"
import Game from "models/game"

import "./style.scss"

export default class GameList extends React.Component<InjectedProps, State> {
	constructor(props: Readonly<InjectedProps>) {
		super(props)
		this.state = { publicGames: [] }
	}

	render() {
		return <div className="games-page">
			<form className="game-search">
				<Input label="Game id" id="game-id" name="game-id" type="text"/>
				<Input type="button"
				       value="Join the game"
				       onClick={() => this.initCreateGame()}/>
			</form>

			<form className="game-create">
				<Input type="button" value="Create a new game"/>
			</form>

			<div className="games-container">{this.renderGameList()}</div>
		</div>
	}

	private initCreateGame() {
		throw new Error("Method not implemented.")
	}

	private renderGameList(): React.ReactNode {
		if (!this.state.publicGames.length)
			return <div>No game available</div>

		return <ul>
			{this.state.publicGames.map(g =>
			<li>{}</li>)}
		</ul>
	}
}

interface Props {}

interface State {
	publicGames: Game[]
}

type InjectedProps = Props & RouteComponentProps
