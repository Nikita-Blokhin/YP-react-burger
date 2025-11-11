import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
} from './orderActions'
import type { Action } from '../types/Services'
import { Order } from '../types/Order'

const orderInitialState = {
    order: null as Order | null,
    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (state = orderInitialState, action: Action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST:
            return { ...state, orderRequest: true }
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                orderFailed: false,
                order: action.order,
                orderRequest: false,
            }
        case POST_ORDER_FAILED:
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                order: null,
            }
        default:
            return state
    }
}
