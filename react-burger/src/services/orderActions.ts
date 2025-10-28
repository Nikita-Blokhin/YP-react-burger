import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { Ingredient } from '../types/Ingredient'
import { State } from '../types/Services'
import { Order } from '../types/Order'
import { requestWithAuth } from '../utils'
import { GetIngredientsAction } from './ingredientActions'
import { MODAL_OPEN_ORDER } from './modalActions'

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED'

interface PostOrderAction {
    type: string
    ingredients?: Ingredient[]
    order?: Order
}

type APIAction = PostOrderAction | GetIngredientsAction

export const postOrder =
    (
        ingredients: Ingredient[]
    ): ThunkAction<void, State, unknown, APIAction> =>
    async (dispatch: ThunkDispatch<State, unknown, APIAction>) => {
        dispatch({
            type: POST_ORDER_REQUEST,
        })
        const data = ingredients.map((item) => item._id)
        requestWithAuth('orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ingredients: data }),
        })
            .then((data) => {
                dispatch({
                    type: POST_ORDER_SUCCESS,
                    order: data,
                })
                dispatch({ type: MODAL_OPEN_ORDER })
            })
            .catch((error) => {
                dispatch({
                    type: POST_ORDER_FAILED,
                })
                console.error(error)
            })
    }
