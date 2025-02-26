//this will be responsible for fetch request at a specific path and get the data from that path

type FetchOptions = {
    method? : "GET" | "POST" | "PUT" | "DELETE",
    body? : Record<string, unknown>,
    headers? : Record<string, string>
}

class ApiClient {
    private async fetch<T> (
        endPoint: string,
        options: FetchOptions = {}
    ): Promise<T> {

        const {method = "GET", body, headers = {}} = options

        const defaultHeaders = {
            "Contendt-Type": "application/json",
            ...headers
        }

        const response = await fetch(`/api${endPoint}`, {
            method,
            headers: defaultHeaders,
            body: body ? JSON.stringify(body): undefined
        })

        if(!response.ok){
            throw new Error(await response.text())
        }

        return response.json()
    }

    
}