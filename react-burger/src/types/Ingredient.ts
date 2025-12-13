import {
    GET_INGREDIENTS_FAILED,
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    VIEW_INGREDIENT,
} from '../services/actions/ingredientActions'
import { IInitialState } from './Services'

export interface IIngredient {
    _id: string
    name: string
    type: 'bun' | 'sauce' | 'main'
    proteins: number
    fat: number
    carbohydrates: number
    calories: number
    price: number
    image: string
    image_mobile: string
    image_large: string
    __v: number
    uniqueId?: string
}

export interface IGetIngredientsRequest {
    readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSucces {
    readonly type: typeof GET_INGREDIENTS_SUCCESS
    readonly ingredients: IIngredient[]
}

export interface IGetIngredientsFailed {
    readonly type: typeof GET_INGREDIENTS_FAILED
}

export interface IViewIngredient {
    readonly type: typeof VIEW_INGREDIENT
}

export type TIngredientActions =
    | IGetIngredientsRequest
    | IGetIngredientsSucces
    | IGetIngredientsFailed
    | IViewIngredient
    | IInitialState
