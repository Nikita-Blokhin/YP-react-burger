import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START,
    GET_ORDERS_REQUEST,
    GET_ORDERS_FAILED,
    GET_ORDERS_SUCCESS,
    GET_ORDER_BY_ID_FAILED,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    UPDATE_ORDERS,
    WS_CLOSE,
} from '../services/actions/wsAction'
import { IOrder } from './Order'
import { IInitialState } from './Services'

export interface IMessageResponse {
    message: string
    success: boolean
}

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START
    readonly wsURL: string
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
    readonly payload: string
}

export interface IWSConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWSGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE
    readonly payload: IMessageResponse
}

export interface IWSCloseActions {
    readonly type: typeof WS_CLOSE
}

export interface IGetOrdersRequestAction {
    readonly type: typeof GET_ORDERS_REQUEST
}

export interface IGetOrdersSuccessAction {
    readonly type: typeof GET_ORDERS_SUCCESS
}

export interface IGetOrdersFailedAction {
    readonly type: typeof GET_ORDERS_FAILED
}

export interface IUpdateOrdersAction {
    readonly type: typeof UPDATE_ORDERS
    readonly orders: IOrder[]
    readonly total: number
    readonly totalToday: number
}

export interface IGetOrderByIdRequestAction {
    readonly type: typeof GET_ORDER_BY_ID_REQUEST
}

export interface IGetOrderByIdSuccestAction {
    readonly type: typeof GET_ORDER_BY_ID_SUCCESS
    readonly orders: IOrder[]
}

export interface IGetOrderByIdFailedAction {
    readonly type: typeof GET_ORDER_BY_ID_FAILED
}

export type TWSStoreActions = {
    wsInit: typeof WS_CONNECTION_START
    onOpen: typeof WS_CONNECTION_SUCCESS
    onClose: typeof WS_CONNECTION_CLOSED
    onError: typeof WS_CONNECTION_ERROR
    onMessage: typeof WS_GET_MESSAGE
    close: typeof WS_CLOSE
    updateOrder: typeof UPDATE_ORDERS
}

export type TWSActions =
    | IWSConnectionStart
    | IWSConnectionSuccessAction
    | IWSConnectionErrorAction
    | IWSConnectionClosedAction
    | IWSGetMessageAction
    | IWSCloseActions
    | IGetOrdersRequestAction
    | IGetOrdersSuccessAction
    | IGetOrdersFailedAction
    | IUpdateOrdersAction
    | IGetOrderByIdRequestAction
    | IGetOrderByIdSuccestAction
    | IGetOrderByIdFailedAction
    | IInitialState
