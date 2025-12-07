import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { IIngredient } from '../../types/Ingredient'
import { IState } from '../../types/Services'
import { request } from '../../utils'

export const GET_INGREDIENTS_REQUEST: 'GET_INGREDIENTS_REQUEST' =
    'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS: 'GET_INGREDIENTS_SUCCESS' =
    'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED: 'GET_INGREDIENTS_FAILED' =
    'GET_INGREDIENTS_FAILED'

export const VIEW_INGREDIENT: 'VIEW_INGREDIENT' = 'VIEW_INGREDIENT'

export interface IGetIngredientsAction {
    type: string
    ingredients?: IIngredient[]
}

export type TAPIAction = IGetIngredientsAction

export const getIngredients =
    (): ThunkAction<void, IState, unknown, TAPIAction> =>
    async (dispatch: ThunkDispatch<IState, unknown, TAPIAction>) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        })
        request('ingredients')
            .then((data) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data.data as IIngredient[],
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
                console.error(error)
            })
    }
