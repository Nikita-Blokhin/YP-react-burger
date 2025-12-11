import {
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
} from '../services/actions/orderActions'

export interface IOrderItem {
    _id: string
    name: string
    number: number
}

export interface IOrder {
    _id: string
    ingredients: string[]
    status: 'created' | 'pending' | 'done'
    name: string
    number: number
    createdAt: string
    updatedAt: string
}

export interface IOrdersResponse {
    success: boolean
    orders: IOrder[]
    total: number
    totalToday: number
}

export interface IPostOrderRequest {
    readonly type: typeof POST_ORDER_REQUEST
}

export interface IPostOrderSucces {
    readonly type: typeof POST_ORDER_SUCCESS
    readonly order: { order: IOrder }
}

export interface IPostOrderFailed {
    readonly type: typeof POST_ORDER_FAILED
}

export type TOrderActions =
    | IPostOrderRequest
    | IPostOrderSucces
    | IPostOrderFailed
