import * as React from "react"
import { RouteComponentProps } from "react-router-dom"

export default class GameCreator extends React.Component<InjectedProps> {
	render() {
		return <div></div>
	}
}

interface Props {}

type InjectedProps = Props & RouteComponentProps
