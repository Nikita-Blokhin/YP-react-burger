import { Ingredient } from './Ingredient'
import { Order } from './Order'

export interface State {
    ingredients: Ingredient[]
    ingredientsRequest: boolean
    ingredientsFailed: boolean
    ingredientDetail: null | Ingredient
    ingredientsConstructor: Ingredient[]
    isModalDetail: boolean
    isModalOrder: boolean
    order: null | Order
    orderRequest: boolean
    orderFailed: boolean
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
