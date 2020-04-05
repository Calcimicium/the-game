import * as React from "react"
import * as Rr from "react-router-dom"
import Player from "models/player"

export default class Auth extends React.Component<InjectedProps, State> {
	render() {
		if (this.props.player) return this.props.children
		return <Rr.Redirect to="/sign-in"/>
	}
}

interface Props {
	player: Player | null;
}

interface State {}

type InjectedProps = Props & Rr.RouteComponentProps
