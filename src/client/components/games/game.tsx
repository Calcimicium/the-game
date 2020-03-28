import * as React from "react"
import { RouteComponentProps } from "react-router-dom"

export default class Game extends React.Component<InjectedProps> {
	render() {
		return <div></div>
	}
}

interface Params {
	gameId: string
}

interface Props {}

type InjectedProps = Props & RouteComponentProps<Params>
