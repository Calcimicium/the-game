import * as React from "react"

import "./style.scss"

export default class Input extends React.Component<Props> {
	render() {
		return <p className="input-container">
			{this.props.label &&
			<label htmlFor={this.props.id}>{this.props.label}</label>}

			<span>
				<input {...this.props}/>
			</span>
		</p>
	}
}

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
& PropsExtension

interface PropsExtension {
	label?: string;
}
