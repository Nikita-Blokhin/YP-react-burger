export const saveTokens = (accessToken: string, refreshToken: string) => {
    const token = accessToken.replace('Bearer ', '')
    localStorage.setItem('accessToken', token)
    localStorage.setItem('refreshToken', refreshToken)
}

export const getAccessToken = (): string | null => {
    return localStorage.getItem('accessToken')
}

export const getRefreshToken = (): string | null => {
    return localStorage.getItem('refreshToken')
}

export const clearTokens = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
}
