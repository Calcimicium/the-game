import * as React from "react"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import Games from "client/components/games"
import SignIn from "client/components/sign-in"

export class App extends React.Component<Props> {
	constructor(props: Readonly<Props>) {
		super(props)
	}

	render() {
		return <Router>
			<Route path="/" render={() => <Redirect to="/games"/>}/>

			<Route path="/sign-in" render={props => <SignIn {...props}/>}/>

			<Route path="/games" render={props => <Games {...props}/>}/>

			<Route />
		</Router>
	}
}

interface Props {}
