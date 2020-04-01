const host = window.location.host
const wss = "https" === window.location.protocol
const address = getWsAddress(host, wss)

export default new WebSocket(address)

export function getWsAddress(
	host?: string,
	wss = false
): string {
	const protocol = wss ? "wss" : "ws"
	return `${protocol}://${host}`
}
