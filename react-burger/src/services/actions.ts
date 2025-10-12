import { Dispatch } from 'redux'
import { API } from '../core/API'

export const GET_INGREDIENTS_REQUEST = 'GET_IGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_IGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_IGREDIENTS_FAILED'

export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR'
export const ADD_INGREDIENT_CONSTRUCTOR = 'ADD_INGREDIENT_CONSTRUCTOR'
export const DELETE_INGREDIENT_CONSTRUCTOR = 'DELETE_INGREDIENT_CONSTRUCTOR'

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT'

export const CREATE_ORDER = 'CREATE_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'

export const MODAL_OPEN_INGREDIENT = 'MODAL_OPEN_INGREDIENT'
export const MODAL_OPEN_ORDER = 'MODAL_OPEN_ORDER'
export const MODAL_CLOSE = 'MODAL_CLOSE'

export const getItems = (dispatch: Dispatch) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    })
    API.getIngredients().then(res => {
        if (res && res.success) {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: res.data
            })
        } else {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
        }
    })
}
