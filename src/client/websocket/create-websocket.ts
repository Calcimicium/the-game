const host = window.location.host
const wss = "https" === window.location.protocol
const address = getWsAddress(host, wss)

function createWebSocket(): WebSocket {
	const ws = new WebSocket(address)

	ws.onmessage = function (e) {
		console.log("Message", JSON.parse(e.data))
	}

	return ws
}

export default createWebSocket

export function getWsAddress(
	host?: string,
	wss = false
): string {
	const protocol = wss ? "wss" : "ws"
	return `${protocol}://${host}`
}
