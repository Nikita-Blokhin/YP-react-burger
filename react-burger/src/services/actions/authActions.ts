import { RootState } from '../../hooks/reducerHook'
import type { IUser, IAuthResponse } from '../../types/User'
import { request, requestWithAuth } from '../../utils'
import { saveTokens, clearTokens } from '../../utils/auth'
import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit/react'

export const REGISTER_REQUEST: 'REGISTER_REQUEST' = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS: 'REGISTER_SUCCESS' = 'REGISTER_SUCCESS'
export const REGISTER_FAILED: 'REGISTER_FAILED' = 'REGISTER_FAILED'

export const LOGIN_REQUEST: 'LOGIN_REQUEST' = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS'
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED'

export const LOGOUT_REQUEST: 'LOGOUT_REQUEST' = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS'

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS'
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED'

export const UPDATE_USER_REQUEST: 'UPDATE_USER_REQUEST' = 'UPDATE_USER_REQUEST'
export const UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS' = 'UPDATE_USER_SUCCESS'
export const UPDATE_USER_FAILED: 'UPDATE_USER_FAILED' = 'UPDATE_USER_FAILED'

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' =
    'FORGOT_PASSWORD_REQUEST'
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' =
    'FORGOT_PASSWORD_SUCCESS'
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' =
    'FORGOT_PASSWORD_FAILED'

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' =
    'RESET_PASSWORD_REQUEST'
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' =
    'RESET_PASSWORD_SUCCESS'
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' =
    'RESET_PASSWORD_FAILED'

interface IAuthAction {
    type: string
    user?: IUser
}

type TAuthThunk = ThunkAction<void, RootState, unknown, IAuthAction>

export const register =
    (email: string, password: string, name: string): TAuthThunk =>
    async (dispatch: ThunkDispatch<RootState, unknown, IAuthAction>) => {
        dispatch({ type: REGISTER_REQUEST })
        try {
            const data: IAuthResponse = await request('auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            })
            saveTokens(data.accessToken, data.refreshToken)
            dispatch({ type: REGISTER_SUCCESS, user: data.user })
        } catch (error) {
            dispatch({ type: REGISTER_FAILED })
            throw error
        }
    }

export const login =
    (email: string, password: string): TAuthThunk =>
    async (dispatch: ThunkDispatch<RootState, unknown, IAuthAction>) => {
        dispatch({ type: LOGIN_REQUEST })
        try {
            const data: IAuthResponse = await request('auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            })
            saveTokens(data.accessToken, data.refreshToken)
            dispatch({ type: LOGIN_SUCCESS, user: data.user })
        } catch (error) {
            dispatch({ type: LOGIN_FAILED })
            throw error
        }
    }

export const logout =
    (): TAuthThunk =>
    async (dispatch: ThunkDispatch<RootState, unknown, IAuthAction>) => {
        dispatch({ type: LOGOUT_REQUEST })
        try {
            await requestWithAuth('auth/logout', {
                method: 'POST',
            })
            clearTokens()
            dispatch({ type: LOGOUT_SUCCESS })
        } catch (error) {
            clearTokens()
            dispatch({ type: LOGOUT_SUCCESS })
        }
    }

export const getUser =
    (): TAuthThunk =>
    async (dispatch: ThunkDispatch<RootState, unknown, IAuthAction>) => {
        dispatch({ type: GET_USER_REQUEST })
        try {
            const data: { success: boolean; user: IUser } =
                await requestWithAuth('auth/user')
            dispatch({ type: GET_USER_SUCCESS, user: data.user })
        } catch (error) {
            dispatch({ type: GET_USER_FAILED })
            throw error
        }
    }

export const updateUser =
    (email?: string, name?: string, password?: string): TAuthThunk =>
    async (dispatch: ThunkDispatch<RootState, unknown, IAuthAction>) => {
        dispatch({ type: UPDATE_USER_REQUEST })
        try {
            const data: { success: boolean; user: IUser } =
                await requestWithAuth('auth/user', {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, name, password }),
                })
            dispatch({ type: UPDATE_USER_SUCCESS, user: data.user })
        } catch (error) {
            dispatch({ type: UPDATE_USER_FAILED })
            throw error
        }
    }

export const forgotPassword =
    (email: string): TAuthThunk =>
    async (dispatch: ThunkDispatch<RootState, unknown, IAuthAction>) => {
        dispatch({ type: FORGOT_PASSWORD_REQUEST })
        try {
            await request('password-reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            })
            dispatch({ type: FORGOT_PASSWORD_SUCCESS })
        } catch (error) {
            dispatch({ type: FORGOT_PASSWORD_FAILED })
            throw error
        }
    }

export const resetPassword =
    (password: string, token: string): TAuthThunk =>
    async (dispatch: ThunkDispatch<RootState, unknown, IAuthAction>) => {
        dispatch({ type: RESET_PASSWORD_REQUEST })
        try {
            await request('password-reset/reset', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, token }),
            })
            dispatch({ type: RESET_PASSWORD_SUCCESS })
        } catch (error) {
            dispatch({ type: RESET_PASSWORD_FAILED })
            throw error
        }
    }
