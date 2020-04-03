import * as React from "react"
import "./style.scss"

export default class SplashScreen extends React.Component<Props> {
	render() {
		return <div id="splash-screen">
			<h1 id="game-name">Le Jeu</h1>
			{this.props.loading && <p id="loader">Loading...</p>}
		</div>
	}
}

interface Props {
	loading: boolean;
}
