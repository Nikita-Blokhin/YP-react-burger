import { BASE_URL } from '../core/constants'
import { Ingredient } from '../types/Ingredient'

interface SuccessResponse {
    success: boolean
    data: Ingredient[]
}

export const checkResponse = (response: Response) => {
    if (response.ok) return response.json()
    return Promise.reject(`Ошибка ${response.status}`)
}

const checkSuccess = (response: SuccessResponse) => {
    if (response && response.success) return response
    return Promise.reject(`Ответ не success: ${response}`)
}

export const request = async (endpoint: string, options?: RequestInit) => {
    return await fetch(`${BASE_URL}${endpoint}`, options)
        .then(checkResponse)
        .then(checkSuccess)
}
