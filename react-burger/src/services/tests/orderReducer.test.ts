import { IOrder } from '../../types'
import * as types from '../actions'
import { orderReducer } from '../reducers/orderReducer'

const initialState = {
    order: null,
    orderRequest: false,
    orderFailed: false,
}

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
        ).toEqual(initialState)
    })

    it('проверка POST_ORDER_REQUEST', () => {
        expect(
            orderReducer(initialState, {
                type: types.POST_ORDER_REQUEST,
            })
        ).toEqual({ ...initialState, orderRequest: true })
    })

    it('проверка POST_ORDER_SUCCESS', () => {
        expect(
            orderReducer(initialState, {
                type: types.POST_ORDER_SUCCESS,
                order: { order: mockOrder },
            })
        ).toEqual({ ...initialState, order: mockOrder })
    })

    it('проверка POST_ORDER_FAILED', () => {
        expect(
            orderReducer(
                { ...initialState, order: mockOrder },
                {
                    type: types.POST_ORDER_FAILED,
                }
            )
        ).toEqual({ ...initialState, orderFailed: true })
    })
})
