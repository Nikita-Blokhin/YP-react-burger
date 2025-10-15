export const checkResponse = async (response: Response) => {
    if (response.ok) return await response.json()
    return Promise.reject(`Ошибка ${response.status}`)
}

export const request = async (url: string, options: RequestInit = {}) => {
    const response = await fetch(url, options)
    return checkResponse(response)
}
