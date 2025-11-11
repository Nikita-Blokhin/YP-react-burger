import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from './ingredientActions'
import type { Action } from '../types/Services'
import { Ingredient } from '../types/Ingredient'

const ingredientsInitialState = {
    ingredients: [] as Ingredient[],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsReducer = (
    state = ingredientsInitialState,
    action: Action
) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST:
            return { ...state, ingredientsRequest: true }
        case GET_INGREDIENTS_SUCCESS:
            return {
                ...state,
                ingredientsFailed: false,
                ingredients: action.ingredients,
                ingredientsRequest: false,
            }
        case GET_INGREDIENTS_FAILED:
            return {
                ...state,
                ingredientsFailed: true,
                ingredientsRequest: false,
                ingredients: [],
            }
        default:
            return state
    }
}
