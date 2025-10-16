import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { v4 as uuidv4 } from 'uuid'

import { Ingredient } from '../types/Ingredient'
import { State } from '../types/Services'
import { Order } from '../types/Order'
import { request } from '../utils'

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
    request('ingredients')
        .then(data => {
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                ingredients: data.data
            })
        })
        .catch(error => {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            })
            alert(error)
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
    const data = ingredients.map(item => item._id)
    request('orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({'ingredients': data})
    })
        .then(data => {
            dispatch({
                type: POST_ORDER_SUCCESS,
                order: data
            })
            dispatch({ type: MODAL_OPEN_ORDER })
        })
        .catch(error => {
            dispatch({
                type: POST_ORDER_FAILED
            })
            alert(error)
        })
}

export const addIngridient = (item: Ingredient) => {
    return {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        ingredient: {
            ...item,
            uniqueId: uuidv4()
        }
    }
}
