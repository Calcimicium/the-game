import * as React from "react"
import * as Rr from "react-router-dom"

class Games extends React.Component<InjectedProps> {
	render() {
		return <div/>
	}
}

export default Rr.withRouter(Games)

interface Props {}

type InjectedProps = Props & Rr.RouteComponentProps
