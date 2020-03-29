export interface Env {
	wsAddress: string;
}

export const DEFAULT_HOST = "localhost"
export const DEFAULT_PORT = 3000
export const ENV_TEMPLATE = "%%__env__%%"

export function getWsAddress(
	host?: string,
	port?: string | number,
	wss = false
): string {
	const protocol = wss ? "wss" : "ws"
	return `${protocol}://${host || DEFAULT_HOST}${port ? `:${port}` : ""}`
}
