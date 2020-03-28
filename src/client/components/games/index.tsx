import * as React from "react"
import { RouteComponentProps, Switch, Route } from "react-router-dom"
import Game from "./game"
import GameList from "./game-list"
import GameCreator from "./game-creator"

export default class Games extends React.Component<InjectedProps> {
	render() {
		return <Switch>
			<Route path="/games/create" render={props => <GameCreator {...props}/>}/>

			<Route path="/games/:gameId" render={props => <Game {...props}/>}/>

			<Route path="/games" render={props => <GameList {...props}/>}/>
		</Switch>
	}
}

interface Props {
	webSocket: WebSocket;
}

type InjectedProps = Props & RouteComponentProps
