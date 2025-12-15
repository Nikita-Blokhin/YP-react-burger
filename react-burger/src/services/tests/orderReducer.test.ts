import { IOrder } from '../../types'
import * as types from '../actions'
import { orderInitialState, orderReducer } from '../reducers/orderReducer'

export const mockOrder: IOrder = {
    _id: '1',
    ingredients: ['1', '2'],
    status: 'created',
    name: 'order',
    number: 1,
    createdAt: '01/01/0001',
    updatedAt: '01/01/0001',
}

describe('orderReducer', () => {
    it('проверка исходного состояния', () => {
        expect(
            orderReducer(undefined, {
                type: types.INITIAL_STATE,
            })
        ).toEqual(orderInitialState)
    })

    it('проверка POST_ORDER_REQUEST', () => {
        expect(
            orderReducer(orderInitialState, {
                type: types.POST_ORDER_REQUEST,
            })
        ).toEqual({ ...orderInitialState, orderRequest: true })
    })

    it('проверка POST_ORDER_SUCCESS', () => {
        expect(
            orderReducer(orderInitialState, {
                type: types.POST_ORDER_SUCCESS,
                order: { order: mockOrder },
            })
        ).toEqual({ ...orderInitialState, order: mockOrder })
    })

    it('проверка POST_ORDER_FAILED', () => {
        expect(
            orderReducer(
                { ...orderInitialState, order: mockOrder },
                {
                    type: types.POST_ORDER_FAILED,
                }
            )
        ).toEqual({ ...orderInitialState, orderFailed: true })
    })
})
