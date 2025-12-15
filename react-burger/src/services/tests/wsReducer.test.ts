import * as types from '../actions'
import { initialState, wsReducer } from '../reducers/wsReducer'
import { mockOrder } from './orderReducer.test'

describe('wsReducer', () => {
    it('проверка исходного состояния', () => {
        expect(
            wsReducer(undefined, {
                type: types.INITIAL_STATE,
            })
        ).toEqual(initialState)
    })

    it('проверка WS_CONNECTION_START', () => {
        expect(
            wsReducer(initialState, {
                type: types.WS_CONNECTION_START,
                wsURL: 'url',
            })
        ).toEqual(initialState)
    })

    it('проверка WS_CONNECTION_SUCCESS', () => {
        expect(
            wsReducer(initialState, {
                type: types.WS_CONNECTION_SUCCESS,
            })
        ).toEqual({ ...initialState, wsConnected: true })
    })

    it('проверка WS_CONNECTION_ERROR', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.WS_CONNECTION_ERROR,
                    payload: 'error',
                }
            )
        ).toEqual({
            ...initialState,
            error: 'error',
            wsConnected: false,
        })
    })

    it('проверка WS_CLOSE', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.WS_CLOSE,
                }
            )
        ).toEqual({ ...initialState, wsConnected: false })
    })

    it('проверка WS_CONNECTION_CLOSED', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.WS_CONNECTION_CLOSED,
                }
            )
        ).toEqual({ ...initialState, wsConnected: false })
    })

    it('проверка WS_GET_MESSAGE', () => {
        expect(
            wsReducer(
                {
                    ...initialState,
                    wsConnected: true,
                    messages: [
                        {
                            message: 'message first',
                            success: true,
                        },
                    ],
                },
                {
                    type: types.WS_GET_MESSAGE,
                    payload: {
                        message: 'new message',
                        success: true,
                    },
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: true,
            messages: [
                {
                    message: 'message first',
                    success: true,
                },
                {
                    message: 'new message',
                    success: true,
                },
            ],
        })
    })

    it('проверка GET_ORDERS_REQUEST', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.GET_ORDERS_REQUEST,
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: true,
            allOrdersRequest: true,
            allOrdersFailed: false,
        })
    })

    it('проверка UPDATE_ORDERS', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.UPDATE_ORDERS,
                    orders: [mockOrder],
                    total: 1,
                    totalToday: 1,
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: true,
            allOrders: [mockOrder],
            total: 1,
            totalToday: 1,
        })
    })

    it('проверка GET_ORDERS_FAILED', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.GET_ORDERS_FAILED,
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: true,
            allOrdersFailed: true,
        })
    })

    it('проверка GET_ORDER_BY_ID_REQUEST', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.GET_ORDER_BY_ID_REQUEST,
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: true,
        })
    })

    it('проверка GET_ORDER_BY_ID_SUCCESS', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.GET_ORDER_BY_ID_SUCCESS,
                    orders: [mockOrder],
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: true,
            selectedOrder: mockOrder,
        })
    })

    it('проверка GET_ORDER_BY_ID_FAILED', () => {
        expect(
            wsReducer(
                { ...initialState, wsConnected: true },
                {
                    type: types.GET_ORDER_BY_ID_FAILED,
                }
            )
        ).toEqual({
            ...initialState,
            wsConnected: true,
        })
    })
})
