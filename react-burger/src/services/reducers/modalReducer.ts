import { TModalActions } from '../../types'
import { IIngredient } from '../../types/Ingredient'
import {
    MODAL_OPEN_INGREDIENT,
    MODAL_OPEN_ORDER,
    MODAL_CLOSE,
    MODAL_OPEN_ORDER_INFO,
} from '../actions/modalActions'

export const modalInitialState = {
    isModalDetail: false,
    isModalOrder: false,
    ingredientDetail: null as IIngredient | null,
    title: '',
}

export const modalReducer = (
    state = modalInitialState,
    action: TModalActions
) => {
    switch (action.type) {
        case MODAL_OPEN_INGREDIENT:
            return {
                ...state,
                isModalDetail: true,
                ingredientDetail: action.ingredientDetail,
            }
        case MODAL_OPEN_ORDER:
            return { ...state, isModalOrder: true }
        case MODAL_OPEN_ORDER_INFO:
            return { ...state, isModalOrder: true, title: action.title }
        case MODAL_CLOSE:
            return {
                ...state,
                isModalOrder: false,
                ingredientDetail: null,
                isModalDetail: false,
                title: '',
            }
        default:
            return state
    }
}
