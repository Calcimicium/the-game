import * as serialize from "serialize-javascript"
import websocket from "client/websocket"

export abstract class BaseService<TModel> {
	constructor(webSocket: WebSocket) {
		this._webSocket = webSocket
		this._webSocket.onmessage = function(e) {
			console.log("message", e.data)
		}
	}

	get webSocket(): WebSocket {
		return this._webSocket
	}

	protected sendMessage<TBody>(message: Message<TBody>) {
		websocket.send(serialize(message))
	}

	abstract get(): void

	private _webSocket: WebSocket
}

export interface Message<TBody> {
	endpoint: string;
	method: MessageMethod;
	body?: TBody;
}

export type MessageMethod = "create" | "delete" | "get" | "update"
