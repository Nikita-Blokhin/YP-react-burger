import * as types from '../actions'
import { modalInitialState, modalReducer } from '../reducers/modalReducer'
import { mockIngredients } from './constructorReducer.test'

describe('modalReducer', () => {
    it('проверка исходного состояния', () => {
        expect(
            modalReducer(undefined, {
                type: types.INITIAL_STATE,
            })
        ).toEqual(modalInitialState)
    })

    it('проверка MODAL_OPEN_INGREDIENT', () => {
        expect(
            modalReducer(modalInitialState, {
                type: types.MODAL_OPEN_INGREDIENT,
                ingredientDetail: mockIngredients[0],
            })
        ).toEqual({
            ...modalInitialState,
            isModalDetail: true,
            ingredientDetail: mockIngredients[0],
        })
    })

    it('проверка MODAL_OPEN_ORDER', () => {
        expect(
            modalReducer(modalInitialState, {
                type: types.MODAL_OPEN_ORDER,
            })
        ).toEqual({
            ...modalInitialState,
            isModalOrder: true,
        })
    })

    it('проверка MODAL_OPEN_ORDER_INFO', () => {
        expect(
            modalReducer(modalInitialState, {
                type: types.MODAL_OPEN_ORDER_INFO,
                title: 'test',
            })
        ).toEqual({
            ...modalInitialState,
            isModalOrder: true,
            title: 'test',
        })
    })

    it('проверка MODAL_CLOSE', () => {
        expect(
            modalReducer(
                {
                    ...modalInitialState,
                    isModalDetail: true,
                    ingredientDetail: mockIngredients[0],
                },
                {
                    type: types.MODAL_CLOSE,
                }
            )
        ).toEqual(modalInitialState)
    })
})
