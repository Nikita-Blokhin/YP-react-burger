export interface IUser {
    email: string
    name: string
}

export interface IAuthResponse {
    success: boolean
    user: IUser
    accessToken: string
    refreshToken: string
}

export interface IRefreshTokenResponse {
    success: boolean
    accessToken: string
    refreshToken: string
}
