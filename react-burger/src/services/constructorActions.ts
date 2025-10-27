import { v4 as uuidv4 } from 'uuid'

import { Ingredient } from '../types/Ingredient'

export const GET_INGREDIENTS_CONSTRUCTOR = 'GET_INGREDIENTS_CONSTRUCTOR'
export const ADD_INGREDIENT_CONSTRUCTOR = 'ADD_INGREDIENT_CONSTRUCTOR'
export const MOVE_INGREDIENT_CONSTRUCTOR = 'MOVE_INGREDIENT_CONSTRUCTOR'
export const DELETE_INGREDIENT_CONSTRUCTOR = 'DELETE_INGREDIENT_CONSTRUCTOR'

export const addIngridient = (item: Ingredient) => {
    return {
        type: ADD_INGREDIENT_CONSTRUCTOR,
        ingredient: {
            ...item,
            uniqueId: uuidv4(),
        },
    }
}
