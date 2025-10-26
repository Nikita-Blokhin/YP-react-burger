export interface User {
    email: string
    name: string
}

export interface AuthResponse {
    success: boolean
    user: User
    accessToken: string
    refreshToken: string
}

export interface RefreshTokenResponse {
    success: boolean
    accessToken: string
    refreshToken: string
}
