import type { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux'
import type { TWSActions, IOrdersResponse, IState } from '../../types'
import { BASE_WS } from '../../core/constants'
import { getAccessToken } from '../../utils/auth'
import {
    GET_USER_ORDERS_FAILED,
    UPDATE_ORDERS,
    UPDATE_USER_ORDERS,
    WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_CLOSED,
    WS_CONNECTION_ERROR,
    WS_CLOSE,
} from '../actions/wsAction'
import { TTypeConnected } from '../reducers/wsReducer'

export const socketMiddleware: Middleware<
    {},
    IState,
    Dispatch<Action<string>>
> = (storeAPI: MiddlewareAPI<Dispatch<TWSActions>, IState>) => {
    let socket: WebSocket | null = null
    let typeConnected: string | null = null

    return (next: (action: unknown) => unknown) => {
        return (action: unknown): unknown => {
            if (!isTWSActions(action)) {
                return next(action)
            }

            const typedAction = action as TWSActions
            const { type } = typedAction

            if (type === WS_CONNECTION_START) {
                typeConnected = typedAction.typeConnected

                const token = getAccessToken()
                if (!token) {
                    console.error('отсутствует токен')
                    storeAPI.dispatch({ type: GET_USER_ORDERS_FAILED })
                    return
                }

                const wsURL =
                    typeConnected === 'feed'
                        ? `${BASE_WS}/all`
                        : `${BASE_WS}?token=${token}`

                socket = new WebSocket(wsURL)

                socket.onopen = (event) => {
                    storeAPI.dispatch({
                        type: WS_CONNECTION_SUCCESS,
                        typeConnected: typeConnected as TTypeConnected,
                    })
                }

                socket.onerror = (event) => {
                    storeAPI.dispatch({
                        type: WS_CONNECTION_ERROR,
                        payload: event,
                    })
                }

                socket.onmessage = (event) => {
                    const data: IOrdersResponse = JSON.parse(event.data)
                    if (typeConnected === 'feed') {
                        storeAPI.dispatch({
                            type: UPDATE_ORDERS,
                            orders: data.orders,
                            total: data.total,
                            totalToday: data.totalToday,
                        })
                    } else {
                        storeAPI.dispatch({
                            type: UPDATE_USER_ORDERS,
                            orders: data.orders,
                            total: data.total,
                            totalToday: data.totalToday,
                        })
                    }
                }

                socket.onclose = (event) => {
                    storeAPI.dispatch({
                        type: WS_CONNECTION_CLOSED,
                        payload: event,
                    })
                }
            }

            if (type === WS_CLOSE) {
                if (socket) {
                    socket.close()
                    socket = null
                    typeConnected = null
                }
                return
            }

            return next(action)
        }
    }
}

const isTWSActions = (action: unknown): action is TWSActions => {
    return typeof action === 'object' && action !== null && 'type' in action
}
