import type { Ingredient } from './Ingredient'
import type { Order } from './Order'
import type { User } from './User'

export interface State {
    ingredients: {
        ingredients: Ingredient[]
        ingredientsRequest: boolean
        ingredientsFailed: boolean
    }
    order: {
        order: null | Order
        orderRequest: boolean
        orderFailed: boolean
    }
    modal: {
        isModalDetail: boolean
        isModalOrder: boolean
        ingredientDetail: null | Ingredient
    }
    constructor: {
        ingredientsConstructor: Ingredient[]
    }
    auth: {
        user: User | null
        isAuthenticated: boolean
        isLoading: boolean
        error: boolean
    }
}

export interface Action {
    type: string
    id?: string
    ingredients?: Ingredient[]
    ingredient?: Ingredient
    ingredientDetail?: Ingredient
    indexConstructor?: number
    order?: Order
    dragIndex?: number
    hoverIndex?: number
}
