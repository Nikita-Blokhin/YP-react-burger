import { BASE_URL } from '../core/constants'
import type { Ingredient } from '../types/Ingredient'
import { User } from '../types/User'
import {
    getAccessToken,
    getRefreshToken,
    saveTokens,
    clearTokens,
} from './auth'

interface SuccessResponse {
    success: boolean
    data: Ingredient[]
    user: User
    accessToken: string
    refreshToken: string
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

export const requestWithAuth = async (
    endpoint: string,
    options?: RequestInit
) => {
    const accessToken = getAccessToken()

    const headers = {
        ...options?.headers,
        'Content-Type': 'application/json',
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    }

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
            ...options,
            headers,
        })

        if (response.status === 401 || response.status === 403) {
            const refreshToken = getRefreshToken()
            if (!refreshToken) {
                clearTokens()
                throw new Error('No refresh token available')
            }

            const refreshResponse = await fetch(`${BASE_URL}auth/token`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: refreshToken }),
            })

            if (!refreshResponse.ok) {
                clearTokens()
                throw new Error('Failed to refresh token')
            }

            const refreshData = await refreshResponse.json()
            saveTokens(refreshData.accessToken, refreshData.refreshToken)

            const newAccessToken = refreshData.accessToken.replace(
                'Bearer ',
                ''
            )
            const retryResponse = await fetch(`${BASE_URL}${endpoint}`, {
                ...options,
                headers: {
                    ...options?.headers,
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${newAccessToken}`,
                },
            })

            return checkResponse(retryResponse).then(checkSuccess)
        }

        return checkResponse(response).then(checkSuccess)
    } catch (error) {
        throw error
    }
}
