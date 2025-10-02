import { Ingredient } from './Ingredient'

export interface modalContentType {
    isModal: null | 'order' | 'ingredient'
    content?: undefined | JSX.Element | JSX.Element[]
    ingredients?: Ingredient[]
    ingredient?: null | Ingredient
}
