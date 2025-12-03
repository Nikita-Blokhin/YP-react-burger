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
    GET_ORDER_BY_ID_REQUEST,
    GET_ORDER_BY_ID_SUCCESS,
    GET_ORDER_BY_ID_FAILED,
} from '../actions/wsAction'

type TWSState = {
    wsConnected: boolean
    messages: IMessageResponse[]

    allOrders: IOrder[]
    selectedOrder: IOrder | null
    allOrdersRequest: boolean
    allOrdersFailed: boolean
    total: number
    totalToday: number

    error?: Event
}

const initialState: TWSState = {
    wsConnected: false,
    messages: [],
    allOrders: [],
    selectedOrder: null,
    allOrdersRequest: false,
    allOrdersFailed: false,
    total: 0,
    totalToday: 0,
}

export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
        case WS_CONNECTION_START:
            return {
                ...state,
            }
        case WS_CONNECTION_SUCCESS:
            return {
                ...state,
                error: undefined,
                wsConnected: true,
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
                // allOrders: [],
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
