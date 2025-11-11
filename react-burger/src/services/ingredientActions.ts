import { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { Ingredient } from '../types/Ingredient'
import { State } from '../types/Services'
import { request } from '../utils'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED'

export const VIEW_INGREDIENT = 'VIEW_INGREDIENT'

export interface GetIngredientsAction {
    type: string
    ingredients?: Ingredient[]
}

type APIAction = GetIngredientsAction

export const getIngredients =
    (): ThunkAction<void, State, unknown, APIAction> =>
    async (dispatch: ThunkDispatch<State, unknown, APIAction>) => {
        dispatch({
            type: GET_INGREDIENTS_REQUEST,
        })
        request('ingredients')
            .then((data) => {
                dispatch({
                    type: GET_INGREDIENTS_SUCCESS,
                    ingredients: data.data,
                })
            })
            .catch((error) => {
                dispatch({
                    type: GET_INGREDIENTS_FAILED,
                })
                console.error(error)
            })
    }
