import { TConstructorActions } from '../../types'
import { IIngredient } from '../../types/Ingredient'
import {
    ADD_INGREDIENT_CONSTRUCTOR,
    DELETE_INGREDIENT_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR,
} from '../actions/constructorActions'
import { POST_ORDER_SUCCESS } from '../actions/orderActions'

const constructorInitialState = {
    ingredientsConstructor: [] as IIngredient[],
}

export const constructorReducer = (
    state = constructorInitialState,
    action: TConstructorActions
) => {
    if (state.ingredientsConstructor === undefined)
        state.ingredientsConstructor = []
    switch (action.type) {
        case ADD_INGREDIENT_CONSTRUCTOR: {
            const ingredient = action.ingredient!
            if (ingredient.type === 'bun' && state.ingredientsConstructor) {
                return {
                    ...state,
                    ingredientsConstructor: [
                        ...state.ingredientsConstructor
                            .filter((item) => item.type !== 'bun')
                            .concat(ingredient),
                    ],
                }
            } else {
                return {
                    ...state,
                    ingredientsConstructor: [
                        ...state.ingredientsConstructor,
                        ingredient,
                    ],
                }
            }
        }
        case MOVE_INGREDIENT_CONSTRUCTOR: {
            const fillings = state.ingredientsConstructor.filter(
                (item) => item.type !== 'bun'
            )
            const buns = state.ingredientsConstructor.filter(
                (item) => item.type === 'bun'
            )
            const dragItem = fillings[action.dragIndex]
            const newFillings = [...fillings]
            newFillings.splice(action.dragIndex, 1)
            newFillings.splice(action.hoverIndex, 0, dragItem)
            return {
                ...state,
                ingredientsConstructor: [...buns, ...newFillings],
            }
        }
        case DELETE_INGREDIENT_CONSTRUCTOR: {
            const newIngredients = [...state.ingredientsConstructor]
            const actualIndex = newIngredients.findIndex(
                (item, index) =>
                    item.type !== 'bun' &&
                    newIngredients.filter(
                        (filterItem, filterIndex) =>
                            filterIndex < index && filterItem.type !== 'bun'
                    ).length === action.indexConstructor
            )
            if (actualIndex !== -1) {
                newIngredients.splice(actualIndex, 1)
            }
            return { ...state, ingredientsConstructor: newIngredients }
        }
        case POST_ORDER_SUCCESS:
            return { ...state, ingredientsConstructor: [] }
        default:
            return state
    }
}
