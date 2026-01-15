import type { Middleware, MiddlewareAPI, Dispatch, Action } from 'redux'
import type {
    TWSActions,
    IOrdersResponse,
    TState,
    TWSStoreActions,
} from '../../types'

export const socketMiddleware =
    (
        WSStoreActions: TWSStoreActions
    ): Middleware<{}, TState, Dispatch<Action<string>>> =>
    (storeAPI: MiddlewareAPI<Dispatch<TWSActions>, TState>) => {
        let socket: WebSocket | null = null

        return (next: (action: unknown) => unknown) => {
            return (action: unknown): unknown => {
                if (!isTWSActions(action)) {
                    return next(action)
                }

                const typedAction = action as TWSActions
                const { type } = typedAction

                if (type === WSStoreActions.wsInit) {
                    const wsURL = typedAction.wsURL

                    socket = new WebSocket(wsURL)

                    socket.onopen = (event) => {
                        storeAPI.dispatch({
                            type: WSStoreActions.onOpen,
                        })
                    }

                    socket.onerror = (event) => {
                        storeAPI.dispatch({
                            type: WSStoreActions.onError,
                            payload: 'WS закрыт с ошибкой',
                        })
                    }

                    socket.onmessage = (event) => {
                        const data: IOrdersResponse = JSON.parse(event.data)

                        storeAPI.dispatch({
                            type: WSStoreActions.updateOrder,
                            orders: data.orders,
                            total: data.total,
                            totalToday: data.totalToday,
                        })
                    }

                    socket.onclose = (event) => {
                        storeAPI.dispatch({
                            type: WSStoreActions.onClose,
                        })
                    }
                }

                if (type === WSStoreActions.close) {
                    if (socket) {
                        socket.close()
                        socket = null
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
