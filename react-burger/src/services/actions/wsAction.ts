import type { ThunkAction, ThunkDispatch } from 'redux-thunk'

import type { IState } from '../../types/Services'
import type { IOrder } from '../../types/Order'
import { request } from '../../utils'
import { TWSStoreActions } from '../../types/Ws'

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START'
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
    'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
    'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE'
export const WS_CLOSE: 'WS_CLOSE' = 'WS_CLOSE'

export const GET_ORDERS_REQUEST: 'GET_ORDERS_REQUEST' = 'GET_ORDERS_REQUEST'
export const GET_ORDERS_SUCCESS: 'GET_ORDERS_SUCCESS' = 'GET_ORDERS_SUCCESS'
export const GET_ORDERS_FAILED: 'GET_ORDERS_FAILED' = 'GET_ORDERS_FAILED'

export const UPDATE_ORDERS: 'UPDATE_ORDERS' = 'UPDATE_ORDERS'
export const UPDATE_USER_ORDERS: 'UPDATE_USER_ORDERS' = 'UPDATE_USER_ORDERS'

export const GET_ORDER_BY_ID_REQUEST: 'GET_ORDER_BY_ID_REQUEST' =
    'GET_ORDER_BY_ID_REQUEST'
export const GET_ORDER_BY_ID_SUCCESS: 'GET_ORDER_BY_ID_SUCCESS' =
    'GET_ORDER_BY_ID_SUCCESS'
export const GET_ORDER_BY_ID_FAILED: 'GET_ORDER_BY_ID_FAILED' =
    'GET_ORDER_BY_ID_FAILED'

export const WSStoreActions: TWSStoreActions = {
    wsInit: WS_CONNECTION_START,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
    close: WS_CLOSE,
    updateOrder: UPDATE_ORDERS,
}
export interface IGetOrderAction {
    type: string
    order?: IOrder
}

export type TAPIAction = IGetOrderAction

export const getOrder =
    (orderNum: string): ThunkAction<void, IState, unknown, TAPIAction> =>
    async (dispatch: ThunkDispatch<IState, unknown, TAPIAction>) => {
        dispatch({
            type: GET_ORDER_BY_ID_REQUEST,
        })
        request(`orders/${orderNum}`)
            .then((data) => {
                dispatch({
                    type: GET_ORDER_BY_ID_SUCCESS,
                    orders: data.orders,
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_ORDER_BY_ID_FAILED,
                })
                console.error(error)
            })
    }
