import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CONNECTION_START,
    GET_ORDERS_REQUEST,
    GET_ORDERS_FAILED,
    GET_ORDERS_SUCCESS,
    GET_USER_ORDERS_FAILED,
    GET_USER_ORDERS_REQUEST,
    GET_USER_ORDERS_SUCCESS,
    GET_ORDER_BY_ID_FAILED,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    UPDATE_ORDERS,
    UPDATE_USER_ORDERS,
    WS_CLOSE,
} from '../services/actions/wsAction'
import { TTypeConnected } from '../services/reducers/wsReducer'
import { IOrder } from './Order'

export interface IMessageResponse {
    message: string
    success: boolean
}

export interface IWSConnectionStart {
    readonly type: typeof WS_CONNECTION_START
    readonly typeConnected: TTypeConnected
}

export interface IWSConnectionSuccessAction {
    readonly type: typeof WS_CONNECTION_SUCCESS
    readonly typeConnected: TTypeConnected
}

export interface IWSConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR
    readonly payload: Event
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

export interface IGetUserOrdersRequestAction {
    readonly type: typeof GET_USER_ORDERS_REQUEST
}

export interface IGetUserOrdersSuccessAction {
    readonly type: typeof GET_USER_ORDERS_SUCCESS
}

export interface IGetUserOrdersFailedAction {
    readonly type: typeof GET_USER_ORDERS_FAILED
}

export interface IUpdateUserOrdersAction {
    readonly type: typeof UPDATE_USER_ORDERS
    readonly orders: IOrder[]
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
    | IGetUserOrdersRequestAction
    | IGetUserOrdersSuccessAction
    | IGetUserOrdersFailedAction
    | IUpdateUserOrdersAction
    | IUpdateOrdersAction
    | IGetOrderByIdRequestAction
    | IGetOrderByIdSuccestAction
    | IGetOrderByIdFailedAction
