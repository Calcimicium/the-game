import * as React from "react"
import * as Rr from "react-router-dom"
import Game from "./game"
import GameList from "./game-list"
import GameCreator from "./game-creator"

class Games extends React.Component<InjectedProps> {
	render() {
		return <Rr.Switch>
			<Rr.Route path="/games/create" render={props => <GameCreator {...props}/>}/>
			<Rr.Route path="/games/:gameId" render={props => <Game {...props}/>}/>
			<Rr.Route path="/games" render={props => <GameList {...props}/>}/>
		</Rr.Switch>
	}
}

export default Rr.withRouter(Games)

interface Props {}

type InjectedProps = Props & Rr.RouteComponentProps
