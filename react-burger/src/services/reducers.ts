import { combineReducers } from 'redux'
import {
    GET_INGREDIENTS_REQUEST,
    GET_INGREDIENTS_SUCCESS,
    GET_INGREDIENTS_FAILED,
    POST_ORDER_REQUEST,
    POST_ORDER_SUCCESS,
    POST_ORDER_FAILED,
    ADD_INGREDIENT_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR,
    DELETE_INGREDIENT_CONSTRUCTOR,
    MODAL_OPEN_INGREDIENT,
    MODAL_OPEN_ORDER,
    MODAL_CLOSE,
} from './actions'
import type { Action } from '../types/Services'
import { authReducer } from './authReducer'
import { Ingredient } from '../types/Ingredient'
import { Order } from '../types/Order'

const ingredientsInitialState = {
    ingredients: [] as Ingredient[],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

const orderInitialState = {
    order: null as Order | null,
    orderRequest: false,
    orderFailed: false,
}

const modalInitialState = {
    isModalDetail: false,
    isModalOrder: false,
    ingredientDetail: null as Ingredient | null,
}

const constructorInitialState = {
    ingredientsConstructor: [] as Ingredient[],
}

const ingredientsReducer = (
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

const orderReducer = (state = orderInitialState, action: Action) => {
    switch (action.type) {
        case POST_ORDER_REQUEST:
            return { ...state, orderRequest: true }
        case POST_ORDER_SUCCESS:
            return {
                ...state,
                orderFailed: false,
                order: action.order,
                orderRequest: false,
            }
        case POST_ORDER_FAILED:
            return {
                ...state,
                orderFailed: true,
                orderRequest: false,
                order: null,
            }
        default:
            return state
    }
}

const modalReducer = (state = modalInitialState, action: Action) => {
    switch (action.type) {
        case MODAL_OPEN_INGREDIENT:
            return {
                ...state,
                isModalDetail: true,
                ingredientDetail: action.ingredientDetail,
            }
        case MODAL_OPEN_ORDER:
            return { ...state, isModalOrder: true }
        case MODAL_CLOSE:
            return {
                ...state,
                isModalOrder: false,
                ingredientDetail: null,
                isModalDetail: false,
            }
        default:
            return state
    }
}

const constructorReducer = (
    state = constructorInitialState,
    action: Action
) => {
    if (state.ingredientsConstructor === undefined)
        state.ingredientsConstructor = []
    switch (action.type) {
        case ADD_INGREDIENT_CONSTRUCTOR: {
            const ingredient = action.ingredient!
            if (ingredient.type === 'bun' && state.ingredientsConstructor) {
                return {
                    ...state,
                    ingredientsConstructor: [
                        ...state.ingredientsConstructor
                            .filter((item) => item.type !== 'bun')
                            .concat(ingredient),
                    ],
                }
            } else {
                return {
                    ...state,
                    ingredientsConstructor: [
                        ...state.ingredientsConstructor,
                        ingredient,
                    ],
                }
            }
        }
        case MOVE_INGREDIENT_CONSTRUCTOR: {
            const fillings = state.ingredientsConstructor.filter(
                (item) => item.type !== 'bun'
            )
            const buns = state.ingredientsConstructor.filter(
                (item) => item.type === 'bun'
            )
            const dragItem = fillings[action.dragIndex as number]
            const newFillings = [...fillings]
            newFillings.splice(action.dragIndex as number, 1)
            newFillings.splice(action.hoverIndex as number, 0, dragItem)
            return {
                ...state,
                ingredientsConstructor: [...buns, ...newFillings],
            }
        }
        case DELETE_INGREDIENT_CONSTRUCTOR: {
            const newIngredients = [...state.ingredientsConstructor]
            const actualIndex = newIngredients.findIndex(
                (item, index) =>
                    item.type !== 'bun' &&
                    newIngredients.filter(
                        (filterItem, filterIndex) =>
                            filterIndex < index && filterItem.type !== 'bun'
                    ).length === action.indexConstructor
            )
            if (actualIndex !== -1) {
                newIngredients.splice(actualIndex, 1)
            }
            return { ...state, ingredientsConstructor: newIngredients }
        }
        case POST_ORDER_SUCCESS:
            return { ...state, ingredientsConstructor: [] }
        default:
            return state
    }
}

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    constructor: constructorReducer,
    auth: authReducer,
})
