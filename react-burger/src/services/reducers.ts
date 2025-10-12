import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,

    ADD_INGREDIENT_CONSTRUCTOR,
    DELETE_INGREDIENT_CONSTRUCTOR,

    MODAL_OPEN_INGREDIENT,
    MODAL_CLOSE
} from './actions'
import { Action, State } from '../types/Services'

const initialState: State = {
    ingredients: [],
    ingredientsRequest: false,
    ingredientsFailed: false,

    ingredientDetail: null,

    ingredientsConstructor: [],

    isModal: false
}

export const rootReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                itemsRequest: true
            }
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state, ingredientsFailed: false,
                ingredients: action.ingredients, ingredientsRequest: false
            }
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state, ingredientsFailed: true, ingredientsRequest: false
            }
        }

        case ADD_INGREDIENT_CONSTRUCTOR: {
            return {
                ...state, ingredientsConstructor: [
                    ...state.ingredientsConstructor,
                    ...state.ingredients.filter(item => item._id === action.id)
                ]
            }
        }
        case DELETE_INGREDIENT_CONSTRUCTOR: {
            return {
                ...state,
                ingredientsConstructor: [
                    ...state.ingredientsConstructor,
                    [...state.ingredients]
                        .filter(item => item._id !== action.id)
                ]
            }
        }

        case MODAL_OPEN_INGREDIENT: {
            return {
                ...state, isModal: true, 
                ingredientDetail: action.ingredientDetail
            }
        }
        case MODAL_CLOSE: {
            return {
                ...state, isModal: false
            }
        }

        default: {
            return state
        }
    }
}
