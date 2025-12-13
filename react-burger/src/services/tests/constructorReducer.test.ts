import { constructorReducer } from '../reducers/constructorReducer'
import * as types from '../actions'
import { IIngredient } from '../../types'

const initialState = {
    ingredientsConstructor: [] as IIngredient[],
}

const mockIngredient = {
    proteins: 100,
    fat: 100,
    carbohydrates: 100,
    calories: 100,
    price: 500,
    image: 'src',
    image_mobile: 'src',
    image_large: 'src',
    __v: 1,
    uniqueId: undefined,
}
export const mockIngredients: IIngredient[] = [
    {
        _id: '1',
        name: 'bun1',
        type: 'bun',
        ...mockIngredient,
    },
    {
        _id: '2',
        name: 'bun2',
        type: 'bun',
        ...mockIngredient,
    },
    {
        _id: '3',
        name: 'main1',
        type: 'main',
        ...mockIngredient,
    },
    {
        _id: '4',
        name: 'main2',
        type: 'main',
        ...mockIngredient,
    },
]

const mockState = {
    ingredientsConstructor: mockIngredients.slice(1),
}

describe('constructorReducer', () => {
    it('проверка исходного состояния', () => {
        expect(
            constructorReducer(undefined, {
                type: types.INITIAL_STATE,
            })
        ).toEqual(initialState)
    })

    it('проверка ADD_INGREDIENT_CONSTRUCTOR', () => {
        expect(
            constructorReducer(initialState, {
                type: types.ADD_INGREDIENT_CONSTRUCTOR,
                ingredient: mockIngredients[0],
            })
        ).toEqual({ ingredientsConstructor: [mockIngredients[0]] })
        expect(
            constructorReducer(
                { ingredientsConstructor: [mockIngredients[0]] },
                {
                    type: types.ADD_INGREDIENT_CONSTRUCTOR,
                    ingredient: mockIngredients[1],
                }
            )
        ).toEqual({ ingredientsConstructor: [mockIngredients[1]] })
        expect(
            constructorReducer(
                { ingredientsConstructor: [mockIngredients[0]] },
                {
                    type: types.ADD_INGREDIENT_CONSTRUCTOR,
                    ingredient: mockIngredients[2],
                }
            )
        ).toEqual({
            ingredientsConstructor: [mockIngredients[0], mockIngredients[2]],
        })
    })

    it('проверка MOVE_INGREDIENT_CONSTRUCTOR', () => {
        expect(
            constructorReducer(mockState, {
                type: types.MOVE_INGREDIENT_CONSTRUCTOR,
                dragIndex: 0,
                hoverIndex: 1,
            })
        ).toEqual(mockState)
        expect(
            constructorReducer(mockState, {
                type: types.MOVE_INGREDIENT_CONSTRUCTOR,
                dragIndex: 1,
                hoverIndex: 0,
            })
        ).toEqual({
            ingredientsConstructor: [
                mockState.ingredientsConstructor[0],
                mockState.ingredientsConstructor[2],
                mockState.ingredientsConstructor[1],
            ],
        })
    })

    it('проверка DELETE_INGREDIENT_CONSTRUCTOR', () => {
        expect(
            constructorReducer(mockState, {
                type: types.DELETE_INGREDIENT_CONSTRUCTOR,
                indexConstructor: 0,
            })
        ).toEqual({
            ingredientsConstructor: [
                mockState.ingredientsConstructor[0],
                mockState.ingredientsConstructor[2],
            ],
        })
    })

    it('проверка POST_ORDER_SUCCESS', () => {
        expect(
            constructorReducer(mockState, {
                type: types.POST_ORDER_SUCCESS,
            })
        ).toEqual(initialState)
    })
})
