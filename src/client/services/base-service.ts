import * as serialize from "serialize-javascript"

export async function get<TResBody>(path: string): Promise<TResBody> {
	return await genericFetch(path)
}

export async function post<TReqBody, TResBody>(
	path: string,
	body?: TReqBody
): Promise<TResBody> {
	return await genericFetch(path, "POST", body)
}

async function genericFetch<TResBody>(
	path: string,
	method?: "DELETE" | "GET"
): Promise<TResBody>
async function genericFetch<TReqBody, TResBody>(
	path: string,
	method: "POST" | "PUT",
	body: TReqBody
): Promise<TResBody>
async function genericFetch<TReqBody, TResBody>(
	path: string,
	method: "DELETE" | "GET" | "POST" | "PUT" = "GET",
	body?: TReqBody
): Promise<TResBody> {
	const url = `${window.location.origin}${path}`
	const headers = new Headers()
	headers.append("Accept", "application/json")
	headers.append("Content-Type", "application/json")

	const init: RequestInit = { headers, method }
	if (body) init.body = serialize(body)

	const response = await fetch(url, init)

	if (response.ok) return response.json()

	throw response
}
