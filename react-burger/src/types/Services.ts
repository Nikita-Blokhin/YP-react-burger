import { Ingredient } from './Ingredient'

export interface State {
    ingredients: Ingredient[]
    ingredientsRequest: boolean
    ingredientsFailed: boolean
    ingredientDetail: null | Ingredient
    ingredientsConstructor: Ingredient[]
    isModal: boolean
}

export interface Action {
    type: string
    id?: string
    ingredients?: Ingredient[]
    ingredient?: Ingredient
    ingredientDetail?: Ingredient
    indexConstructor?: number
}
