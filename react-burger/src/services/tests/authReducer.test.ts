import { authReducer } from '../reducers/authReducer'
import * as types from '../actions'

const trueAuthState = {
    user: {
        email: 'test@test.test',
        name: 'test',
    },
    isAuthenticated: true,
    isLoading: false,
    error: false,
}

const falseAuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: false,
}

describe('authReducer', () => {
    it('проверка исходного состояния', () => {
        expect(
            authReducer(undefined, {
                type: types.INITIAL_STATE,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: false,
        })
    })

    it('проверка REGISTER_REQUEST', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.REGISTER_REQUEST,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            error: false,
        })
    })

    it('проверка LOGIN_REQUEST', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.LOGIN_REQUEST,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            error: false,
        })
    })

    it('проверка GET_USER_REQUEST', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.GET_USER_REQUEST,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            error: false,
        })
    })

    it('проверка UPDATE_USER_REQUEST', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.UPDATE_USER_REQUEST,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            error: false,
        })
    })

    it('проверка FORGOT_PASSWORD_REQUEST', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.FORGOT_PASSWORD_REQUEST,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            error: false,
        })
    })

    it('проверка RESET_PASSWORD_REQUEST', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.RESET_PASSWORD_REQUEST,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: true,
            error: false,
        })
    })

    it('проверка REGISTER_SUCCESS', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.REGISTER_SUCCESS,
                user: {
                    email: 'test@test.test',
                    name: 'test',
                },
            })
        ).toEqual({
            user: {
                email: 'test@test.test',
                name: 'test',
            },
            isAuthenticated: true,
            isLoading: false,
            error: false,
        })
    })

    it('проверка LOGIN_SUCCESS', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.LOGIN_SUCCESS,
                user: {
                    email: 'test@test.test',
                    name: 'test',
                },
            })
        ).toEqual({
            user: {
                email: 'test@test.test',
                name: 'test',
            },
            isAuthenticated: true,
            isLoading: false,
            error: false,
        })
    })

    it('проверка GET_USER_SUCCESS', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.GET_USER_SUCCESS,
                user: {
                    email: 'test@test.test',
                    name: 'test',
                },
            })
        ).toEqual({
            user: {
                email: 'test@test.test',
                name: 'test',
            },
            isAuthenticated: true,
            isLoading: false,
            error: false,
        })
    })

    it('проверка UPDATE_USER_SUCCESS', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.UPDATE_USER_SUCCESS,
                user: {
                    email: 'test@test.test',
                    name: 'test',
                },
            })
        ).toEqual({
            user: {
                email: 'test@test.test',
                name: 'test',
            },
            isAuthenticated: true,
            isLoading: false,
            error: false,
        })
    })

    it('проверка REGISTER_FAILED', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.REGISTER_FAILED,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: true,
        })
    })

    it('проверка LOGIN_FAILED', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.LOGIN_FAILED,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: true,
        })
    })

    it('проверка GET_USER_FAILED', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.GET_USER_FAILED,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: true,
        })
    })
    it('проверка UPDATE_USER_FAILED', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.UPDATE_USER_FAILED,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: true,
        })
    })

    it('проверка FORGOT_PASSWORD_FAILED', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.FORGOT_PASSWORD_FAILED,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: true,
        })
    })

    it('проверка RESET_PASSWORD_FAILED', () => {
        expect(
            authReducer(falseAuthState, {
                type: types.RESET_PASSWORD_FAILED,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: true,
        })
    })

    it('проверка FORGOT_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(trueAuthState, {
                type: types.FORGOT_PASSWORD_SUCCESS,
            })
        ).toEqual({
            user: {
                email: 'test@test.test',
                name: 'test',
            },
            isAuthenticated: false,
            isLoading: false,
            error: false,
        })
    })

    it('проверка RESET_PASSWORD_SUCCESS', () => {
        expect(
            authReducer(trueAuthState, {
                type: types.RESET_PASSWORD_SUCCESS,
            })
        ).toEqual({
            user: {
                email: 'test@test.test',
                name: 'test',
            },
            isAuthenticated: false,
            isLoading: false,
            error: false,
        })
    })

    it('проверка LOGOUT_SUCCESS', () => {
        expect(
            authReducer(trueAuthState, {
                type: types.LOGOUT_SUCCESS,
            })
        ).toEqual({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: false,
        })
    })
})
