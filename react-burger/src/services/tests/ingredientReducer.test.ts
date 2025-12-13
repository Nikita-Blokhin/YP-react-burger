import { IIngredient } from '../../types'
import * as types from '../actions'
import { ingredientsReducer } from '../reducers/ingredientReducer'
import { mockIngredients } from './constructorReducer.test'

const initialState = {
    ingredients: [] as IIngredient[],
    ingredientsRequest: false,
    ingredientsFailed: false,
}

describe('ingredientReducer', () => {
    it('проверка исходного состояния', () => {
        expect(
            ingredientsReducer(undefined, {
                type: types.INITIAL_STATE,
            })
        ).toEqual(initialState)
    })

    it('проверка GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(initialState, {
                type: types.GET_INGREDIENTS_REQUEST,
            })
        ).toEqual({ ...initialState, ingredientsRequest: true })
    })

    it('проверка GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer(initialState, {
                type: types.GET_INGREDIENTS_SUCCESS,
                ingredients: mockIngredients,
            })
        ).toEqual({ ...initialState, ingredients: mockIngredients })
    })

    it('проверка GET_INGREDIENTS_FAILED', () => {
        expect(
            ingredientsReducer(initialState, {
                type: types.GET_INGREDIENTS_FAILED,
            })
        ).toEqual({ ...initialState, ingredientsFailed: true })
    })
})
