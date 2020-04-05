import * as React from "react"
import * as Rr from "react-router-dom"

class Home extends React.Component<InjectedProps> {
	render() {
		return <div></div>
	}
}

export default Rr.withRouter(Home)

interface Props {}

type InjectedProps = Props & Rr.RouteComponentProps
