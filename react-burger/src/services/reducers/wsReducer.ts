import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_CLOSE,
    WS_CONNECTION_START,
} from '../actions/wsAction'
import type { IMessageResponse, IOrder, TWSActions } from '../../types'
import {
    GET_ORDERS_REQUEST,
    UPDATE_ORDERS,
    GET_ORDERS_FAILED,
    GET_USER_ORDERS_REQUEST,
    UPDATE_USER_ORDERS,
    GET_USER_ORDERS_FAILED,
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILED,
} from '../actions/wsAction'

export type TTypeConnected = 'feed' | 'profile' | null

type TWSState = {
    wsConnected: boolean
    typeConnected: TTypeConnected
    messages: IMessageResponse[]

    allOrders: IOrder[]
    userOrders: IOrder[]
    selectedOrder: IOrder | null
    allOrdersRequest: boolean
    allOrdersFailed: boolean
    userOrdersRequest: boolean
    userOrdersFailed: boolean
    total: number
    totalToday: number

    error?: Event
}

const initialState: TWSState = {
    wsConnected: false,
    typeConnected: null,
    messages: [],
    allOrders: [],
    userOrders: [],
    selectedOrder: null,
    allOrdersRequest: false,
    allOrdersFailed: false,
    userOrdersRequest: false,
    userOrdersFailed: false,
    total: 0,
    totalToday: 0,
}

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
                typeConnected: action.typeConnected,
            }
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true,
                typeConnected: action.typeConnected,
            }

        case WS_CONNECTION_ERROR:
            return {
                ...state,
                error: action.payload,
                wsConnected: false,
            }
        case WS_CLOSE:
        case WS_CONNECTION_CLOSED:
            return {
                ...state,
                error: undefined,
                wsConnected: false,
            }

        case WS_GET_MESSAGE:
            const msg = { ...action.payload }
            return {
                ...state,
                error: undefined,
                messages: [...state.messages, msg],
            }

        case GET_ORDERS_REQUEST:
            return { ...state, allOrdersRequest: true, allOrdersFailed: false }

        case UPDATE_ORDERS:
            return {
                ...state,
                allOrders: action.orders || [],
                total: action.total || 0,
                totalToday: action.totalToday || 0,
                allOrdersRequest: false,
                allOrdersFailed: false,
            }

        case GET_ORDERS_FAILED:
            return {
                ...state,
                allOrdersRequest: false,
                allOrdersFailed: true,
                allOrders: [],
            }

        case GET_USER_ORDERS_REQUEST:
            return {
                ...state,
                userOrdersRequest: true,
                userOrdersFailed: false,
            }

        case UPDATE_USER_ORDERS:
            return {
                ...state,
                userOrders: action.orders || [],
                userOrdersRequest: false,
                userOrdersFailed: false,
            }

        case GET_USER_ORDERS_FAILED:
            return {
                ...state,
                userOrdersRequest: false,
                userOrdersFailed: true,
                userOrders: [],
            }

        case GET_ORDER_BY_ID_REQUEST:
            return { ...state }

        case GET_ORDER_BY_ID_SUCCESS:
            return { ...state, selectedOrder: action.orders[0] || null }

        case GET_ORDER_BY_ID_FAILED:
            return { ...state, selectedOrder: null }

        default:
            return state
    }
}
