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

export async function post<TResponseBody, TRequestBody>(
	path: string,
	body: TRequestBody
): Promise<TResponseBody> {
	const url = `${window.location.origin}${path}`

	const headers = new Headers()
	headers.append("Accept", "application/json")
	headers.append("Content-Type", "application/json")

	const init: RequestInit = {
		body: serialize(body),
		headers,
		method: "POST"
	}

	const response = await fetch(url, init)

	if (response.ok) return response.json()

	throw new Error(response.statusText)
}
