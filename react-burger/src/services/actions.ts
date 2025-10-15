import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { API } from '../core/API'
import { Ingredient } from '../types/Ingredient'
import { State } from '../types/Services'
import { Order } from '../types/Order'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED  = 'POST_ORDER_FAILED'

export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR'
export const ADD_INGREDIENT_CONSTRUCTOR = 'ADD_INGREDIENT_CONSTRUCTOR'
export const MOVE_INGREDIENT_CONSTRUCTOR = 'MOVE_INGREDIENT_CONSTRUCTOR'
export const DELETE_INGREDIENT_CONSTRUCTOR = 'DELETE_INGREDIENT_CONSTRUCTOR'

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT'

export const CREATE_ORDER = 'CREATE_ORDER'
export const REMOVE_ORDER = 'REMOVE_ORDER'

export const MODAL_OPEN_INGREDIENT = 'MODAL_OPEN_INGREDIENT'
export const MODAL_OPEN_ORDER = 'MODAL_OPEN_ORDER'
export const MODAL_CLOSE = 'MODAL_CLOSE'

interface GetIngredientsAction {
    type: string
    ingredients?: Ingredient[]
}

interface PostOrderAction {
    type: string
    order?: Order
}

type APIAction = GetIngredientsAction | PostOrderAction

export const getIngredients = (): ThunkAction<
    void,
    State,
    unknown,
    APIAction
> => async (
    dispatch: ThunkDispatch<State, unknown, APIAction>
) => {
    
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

export const postOrder = (ingredients: Ingredient[]): ThunkAction<
    void,
    State,
    unknown,
    APIAction
> => async (
    dispatch: ThunkDispatch<State, unknown, APIAction>
) => {
    dispatch({
        type: GET_INGREDIENTS_REQUEST
    })

    return API.createOrder(ingredients.map(item => item._id))
        .then(data => {
            dispatch({
                type: POST_ORDER_SUCCESS,
                order: data
            })
            dispatch({ type: MODAL_OPEN_ORDER });
        })
        .catch(error => {
            dispatch({
                type: POST_ORDER_FAILED
            })
            alert(error)
        })
}
