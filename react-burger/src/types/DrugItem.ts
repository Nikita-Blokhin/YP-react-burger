import type { Ingredient } from './Ingredient'

export const INGREDIENT_TYPE = 'ingredient'
export const CONSTRUCTOR_INGREDIENT_TYPE = 'constructor-ingredient'

export interface DragItem {
    type: typeof INGREDIENT_TYPE
    ingredient: Ingredient
}

export interface ConstructorDragItem {
    type: typeof CONSTRUCTOR_INGREDIENT_TYPE
    ingredient: Ingredient
    index: number
}
