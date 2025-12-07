import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAILED,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILED,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAILED,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILED,
} from '../services/actions/authActions'
import { IUser } from './User'

export interface IRegisterRequest {
    readonly type: typeof REGISTER_REQUEST
}

export interface IRegisterSucces {
    readonly type: typeof REGISTER_SUCCESS
    readonly user: IUser
}

export interface IRegisterFailed {
    readonly type: typeof REGISTER_FAILED
}

export interface ILoginRequest {
    readonly type: typeof LOGIN_REQUEST
}

export interface ILoginSucces {
    readonly type: typeof LOGIN_SUCCESS
    readonly user: IUser
}

export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED
}

export interface ILogoutRequest {
    readonly type: typeof LOGOUT_REQUEST
}

export interface ILogoutSucces {
    readonly type: typeof LOGOUT_SUCCESS
}

export interface IGetUserRequest {
    readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSucces {
    readonly type: typeof GET_USER_SUCCESS
    readonly user: IUser
}

export interface IGetUserFailed {
    readonly type: typeof GET_USER_FAILED
}

export interface IUpdateUserRequest {
    readonly type: typeof UPDATE_USER_REQUEST
}

export interface IUpdateUserSucces {
    readonly type: typeof UPDATE_USER_SUCCESS
    readonly user: IUser
}

export interface IUpdateUserFailed {
    readonly type: typeof UPDATE_USER_FAILED
}

export interface IForgotPasswordRequest {
    readonly type: typeof FORGOT_PASSWORD_REQUEST
}

export interface IForgotPasswordSucces {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

export interface IForgotPasswordFailed {
    readonly type: typeof FORGOT_PASSWORD_FAILED
}

export interface IResetPasswordRequest {
    readonly type: typeof RESET_PASSWORD_REQUEST
}

export interface IResetPasswordSucces {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}

export interface IResetPasswordFailed {
    readonly type: typeof RESET_PASSWORD_FAILED
}

export type TAuthActions =
    | IRegisterRequest
    | IRegisterSucces
    | IRegisterFailed
    | ILoginRequest
    | ILoginSucces
    | ILoginFailed
    | ILogoutRequest
    | ILogoutSucces
    | IGetUserRequest
    | IGetUserSucces
    | IGetUserFailed
    | IUpdateUserRequest
    | IUpdateUserSucces
    | IUpdateUserFailed
    | IForgotPasswordRequest
    | IForgotPasswordSucces
    | IForgotPasswordFailed
    | IResetPasswordRequest
    | IResetPasswordSucces
    | IResetPasswordFailed
