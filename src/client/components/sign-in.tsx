import * as cl from "classnames"
import * as React from "react"
import { Redirect, RouteComponentProps } from "react-router-dom"
import * as AuthService from "client/services/auth-service"
import * as PlayerService from "client/services/player-service"

export default class SignIn extends React.Component<InjectedProps, State> {
	constructor(props: Readonly<InjectedProps>) {
		super(props)
		this.state = {}
	}

	render() {
		const nicknameId = "nickname"
		const helperClassNames = cl("input-helper", {
			danger: this.state.alerts?.nickname?.level === AlertLevel.Danger,
			info: this.state.alerts?.nickname?.level === AlertLevel.Info,
			warning: this.state.alerts?.nickname?.level === AlertLevel.Warning,
		})

		return <form onSubmit={e => this.handleSubmit(e)}>
			<p>
				<label htmlFor={nicknameId}>Nickname</label>&nbsp;
				<span>
					<input id={nicknameId} name={nicknameId} type="text" required/>
					{this.state.alerts?.nickname && <small className={helperClassNames}>
						{this.state.alerts.nickname.message}
					</small>}
				</span>
			</p>
			<p>
				<input type="submit"/>
			</p>
		</form>
	}

	private handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
		e.preventDefault()

		const formData = new FormData(e.target as HTMLFormElement)
		const nickname = formData.get("nickname")?.toString()

		PlayerService.validateNickname(nickname, err => {
			if (err) return this.handleNicknameValidationError(err)

			AuthService.signIn(nickname as string)
			.then(playerResBody => {
				this.props.history.replace("/games")
			})
			.catch(reason => console.error(reason))
		})
	}

	private handleNicknameValidationError(err: PlayerService.NicknameError): void {
		console.error(err)

		let alert: Alert = {
			level: AlertLevel.Danger,
			message: "Invalid nickname"
		}

		switch (err.code) {
			case PlayerService.NicknameErrorCode.Empty:
				alert.message = "The nickname must not be empty."
				break;
		}

		this.setState({ alerts: { nickname: alert } })
	}
}

enum AlertLevel {
	Info,
	Warning,
	Danger
}

interface Alert {
	level: AlertLevel;
	message: string;
}

interface Alerts {
	nickname?: Alert;
}

interface Props {}

interface State {
	alerts?: Alerts;
}

type InjectedProps = Props & RouteComponentProps
