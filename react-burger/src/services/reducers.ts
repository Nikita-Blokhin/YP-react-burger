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

    isModal: false,
    ingredientDetail: null,

    ingredientsConstructor: []
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
            const ingredient = state.ingredients
                .filter(item => item._id === action.id)[0]
            if (ingredient.type === 'bun') {
                return {
                    ...state, ingredientsConstructor: [
                    ...state.ingredientsConstructor
                        .filter(item => item.type !== 'bun')
                        .concat(ingredient)
                ]}
            } else {
                return {
                    ...state, ingredientsConstructor: [
                    ...state.ingredientsConstructor,
                    ingredient
                ]}
            }
        }
        case DELETE_INGREDIENT_CONSTRUCTOR: {
            const newIngredients = [...state.ingredientsConstructor]
            const actualIndex = newIngredients.findIndex((item, index) => 
                item.type !== 'bun' 
                && newIngredients.filter((filterItem, filterIndex) => 
                    filterIndex < index
                    && filterItem.type !== 'bun')
                        .length === action.indexConstructor
            )
            if (actualIndex !== -1) {
                newIngredients.splice(actualIndex, 1)
            }
            return {...state, ingredientsConstructor: newIngredients}
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
