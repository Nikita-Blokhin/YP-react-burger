import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
} from '../actions/ingredientActions'
import { IIngredient, TIngredientActions } from '../../types/Ingredient'

const ingredientsInitialState = {
    ingredients: [] as IIngredient[],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

export const ingredientsReducer = (
    state = ingredientsInitialState,
    action: TIngredientActions
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
                ingredients: [] as IIngredient[],
            }
        default:
            return state
    }
}
