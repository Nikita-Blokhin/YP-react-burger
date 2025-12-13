import { ThunkAction, ThunkDispatch } from '@reduxjs/toolkit/react'
import { IIngredient } from '../../types/Ingredient'

import { request } from '../../utils'
import { RootState } from '../../hooks/reducerHook'

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

type TAPIAction = IGetIngredientsAction

export const getIngredients =
    (): ThunkAction<void, RootState, unknown, TAPIAction> =>
    async (dispatch: ThunkDispatch<RootState, unknown, TAPIAction>) => {
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
