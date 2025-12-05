

export async function fetchRequest({ url, options }: { url: string, options?: RequestInit }) {
    const response = await fetch(url, options)
    if (!response.ok) {
        return { data: null, error: "Failed to fetch data :" + response?.status }
    }
    return { data: await response.json(), error: null }
}