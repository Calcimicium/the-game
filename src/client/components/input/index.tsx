import * as React from "react"

import "./style.scss"

export default class Input extends React.Component<Props> {
	render() {
		return <p className="input-container">
			{this.props.label &&
			<label htmlFor={this.props.id}>{this.props.label}</label>}

			<span>
				<input id={this.props.id}
				       name={this.props.name}
				       type={this.props.type}
				       value={this.props.value}
				       onClick={() => this.props.onClick && this.props.onClick()}/>
			</span>
		</p>
	}
}

interface Props {
	id?: string;
	label?: string;
	name?: string;
	type?: string;
	value?: string;
	onClick?(): void
}
