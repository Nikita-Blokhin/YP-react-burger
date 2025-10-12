import type { Ingredient } from "./Ingredient"

export const INGREDIENT_TYPE = "ingredient"

export interface DragItem {
  type: typeof INGREDIENT_TYPE
  ingredient: Ingredient
}
