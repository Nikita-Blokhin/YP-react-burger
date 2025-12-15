import * as types from '../actions'
import {
    ingredientsInitialState,
    ingredientsReducer,
} from '../reducers/ingredientReducer'
import { mockIngredients } from './constructorReducer.test'

describe('ingredientReducer', () => {
    it('проверка исходного состояния', () => {
        expect(
            ingredientsReducer(undefined, {
                type: types.INITIAL_STATE,
            })
        ).toEqual(ingredientsInitialState)
    })

    it('проверка GET_INGREDIENTS_REQUEST', () => {
        expect(
            ingredientsReducer(ingredientsInitialState, {
                type: types.GET_INGREDIENTS_REQUEST,
            })
        ).toEqual({ ...ingredientsInitialState, ingredientsRequest: true })
    })

    it('проверка GET_INGREDIENTS_SUCCESS', () => {
        expect(
            ingredientsReducer(ingredientsInitialState, {
                type: types.GET_INGREDIENTS_SUCCESS,
                ingredients: mockIngredients,
            })
        ).toEqual({ ...ingredientsInitialState, ingredients: mockIngredients })
    })

    it('проверка GET_INGREDIENTS_FAILED', () => {
        expect(
            ingredientsReducer(ingredientsInitialState, {
                type: types.GET_INGREDIENTS_FAILED,
            })
        ).toEqual({ ...ingredientsInitialState, ingredientsFailed: true })
    })
})
