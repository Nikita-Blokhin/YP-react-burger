import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILED,
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILED,
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
} from '../actions/authActions'
import type { IUser } from '../../types/User'
import { TAuthActions } from '../../types/Auth'

export interface IAuthState {
    user: IUser | null
    isAuthenticated: boolean
    isLoading: boolean
    error: boolean
}

export const initialAuthState: IAuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: false,
}

export const authReducer = (
    state = initialAuthState,
    action: TAuthActions
): IAuthState => {
    switch (action.type) {
        case REGISTER_REQUEST:
        case LOGIN_REQUEST:
        case GET_USER_REQUEST:
        case UPDATE_USER_REQUEST:
        case FORGOT_PASSWORD_REQUEST:
        case RESET_PASSWORD_REQUEST:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: true,
                error: false,
            }

        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case GET_USER_SUCCESS:
        case UPDATE_USER_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
                isLoading: false,
                error: false,
            }

        case REGISTER_FAILED:
        case LOGIN_FAILED:
        case GET_USER_FAILED:
        case UPDATE_USER_FAILED:
        case FORGOT_PASSWORD_FAILED:
        case RESET_PASSWORD_FAILED:
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                error: true,
            }

        case FORGOT_PASSWORD_SUCCESS:
        case RESET_PASSWORD_SUCCESS:
            return {
                ...state,
                isAuthenticated: false,
                isLoading: false,
                error: false,
            }

        case LOGOUT_SUCCESS:
            return {
                ...state,
                user: null,
                isAuthenticated: false,
                isLoading: false,
                error: false,
            }

        default:
            return state
    }
}
