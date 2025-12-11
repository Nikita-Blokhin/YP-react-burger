import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { IIngredient } from '../../types/Ingredient'
import { IOrder } from '../../types/Order'
import { requestWithAuth } from '../../utils'
import { IGetIngredientsAction } from './ingredientActions'
import { MODAL_OPEN_ORDER } from './modalActions'
import { RootState } from '../../hooks/reducerHook'

export const POST_ORDER_REQUEST: 'POST_ORDER_REQUEST' = 'POST_ORDER_REQUEST'
export const POST_ORDER_SUCCESS: 'POST_ORDER_SUCCESS' = 'POST_ORDER_SUCCESS'
export const POST_ORDER_FAILED: 'POST_ORDER_FAILED' = 'POST_ORDER_FAILED'

interface IPostOrderAction {
    type: string
    ingredients?: IIngredient[]
    order?: IOrder
}

export type TAPIAction = IPostOrderAction | IGetIngredientsAction

export const postOrder =
    (
        ingredients: IIngredient[]
    ): ThunkAction<void, RootState, unknown, TAPIAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, TAPIAction>) => {
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
