import { Ingredient } from '../types/Ingredient'
import { Action } from '../types/Services'
import {
    MODAL_OPEN_INGREDIENT,
    MODAL_OPEN_ORDER,
    MODAL_CLOSE,
} from './modalActions'

const modalInitialState = {
    isModalDetail: false,
    isModalOrder: false,
    ingredientDetail: null as Ingredient | null,
}

export const modalReducer = (state = modalInitialState, action: Action) => {
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
