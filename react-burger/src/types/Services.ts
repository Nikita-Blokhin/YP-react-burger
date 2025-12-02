import { TTypeConnected } from '../services/reducers/wsReducer'
import type { IIngredient } from './Ingredient'
import type { IOrder } from './Order'
import type { IUser } from './User'
import { IMessageResponse } from './Ws'

export interface IState {
    ingredients: {
        ingredients: IIngredient[]
        ingredientsRequest: boolean
        ingredientsFailed: boolean
    }
    order: {
        order: { order: null | IOrder }
        orderRequest: boolean
        orderFailed: boolean
    }
    modal: {
        isModalDetail: boolean
        isModalOrder: boolean
        ingredientDetail: null | IIngredient
        title: string
    }
    constructor: {
        ingredientsConstructor: IIngredient[]
    }
    auth: {
        user: IUser | null
        isAuthenticated: boolean
        isLoading: boolean
        error: boolean
    }
    ws: {
        wsConnected: boolean
        typeConnected: TTypeConnected
        messages: IMessageResponse[]
        error?: Event
        allOrders: IOrder[]
        userOrders: IOrder[]
        selectedOrder: IOrder | null
        allOrdersRequest: boolean
        allOrdersFailed: boolean
        userOrdersRequest: boolean
        userOrdersFailed: boolean
        total: number
        totalToday: number
    }
}
