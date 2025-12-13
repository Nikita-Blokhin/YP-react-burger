import { IIngredient } from '../../types'
import * as types from '../actions'
import { modalReducer } from '../reducers/modalReducer'
import { mockIngredients } from './constructorReducer.test'

const initialState = {
    isModalDetail: false,
    isModalOrder: false,
    ingredientDetail: null as IIngredient | null,
    title: '',
}

describe('modalReducer', () => {
    it('проверка исходного состояния', () => {
        expect(
            modalReducer(undefined, {
                type: types.INITIAL_STATE,
            })
        ).toEqual(initialState)
    })

    it('проверка MODAL_OPEN_INGREDIENT', () => {
        expect(
            modalReducer(initialState, {
                type: types.MODAL_OPEN_INGREDIENT,
                ingredientDetail: mockIngredients[0],
            })
        ).toEqual({
            ...initialState,
            isModalDetail: true,
            ingredientDetail: mockIngredients[0],
        })
    })

    it('проверка MODAL_OPEN_ORDER', () => {
        expect(
            modalReducer(initialState, {
                type: types.MODAL_OPEN_ORDER,
            })
        ).toEqual({
            ...initialState,
            isModalOrder: true,
        })
    })

    it('проверка MODAL_OPEN_ORDER_INFO', () => {
        expect(
            modalReducer(initialState, {
                type: types.MODAL_OPEN_ORDER_INFO,
                title: 'test',
            })
        ).toEqual({
            ...initialState,
            isModalOrder: true,
            title: 'test',
        })
    })

    it('проверка MODAL_CLOSE', () => {
        expect(
            modalReducer(
                {
                    ...initialState,
                    isModalDetail: true,
                    ingredientDetail: mockIngredients[0],
                },
                {
                    type: types.MODAL_CLOSE,
                }
            )
        ).toEqual(initialState)
    })
})
