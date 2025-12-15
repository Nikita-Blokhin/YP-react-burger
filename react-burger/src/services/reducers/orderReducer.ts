import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
} from '../actions/orderActions'
import { IOrder, TOrderActions } from '../../types/Order'

export const orderInitialState = {
    order: null as IOrder | null,
    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (
    state = orderInitialState,
    action: TOrderActions
) => {
    switch (action.type) {
        case POST_ORDER_REQUEST:
            return { ...state, orderRequest: true }
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                orderFailed: false,
                order: action.order.order,
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
