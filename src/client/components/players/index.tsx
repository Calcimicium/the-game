import * as React from "react"
import * as Rr from "react-router-dom"

class Players extends React.Component<InjectedProps> {
	render() {
		return <div/>
	}
}

export default Rr.withRouter(Players)

interface Props {}

type InjectedProps = Props & Rr.RouteComponentProps
