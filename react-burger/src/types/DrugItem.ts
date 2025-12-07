import type { IIngredient } from './Ingredient'

export const INGREDIENT_TYPE: 'ingredient' = 'ingredient'
export const CONSTRUCTOR_INGREDIENT_TYPE: 'constructor-ingredient' =
    'constructor-ingredient'

export interface IDragItem {
    type: typeof INGREDIENT_TYPE
    ingredient: IIngredient
}

export interface IConstructorDragItem {
    type: typeof CONSTRUCTOR_INGREDIENT_TYPE
    ingredient: IIngredient
    index: number
}
