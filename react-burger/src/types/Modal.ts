import { Ingredient } from './Ingredient'

export interface ModalContentType {
    isModal: null | 'order' | 'ingredient'
    content?: undefined | JSX.Element | JSX.Element[]
    ingredients?: Ingredient[]
    ingredient?: null | Ingredient
}
