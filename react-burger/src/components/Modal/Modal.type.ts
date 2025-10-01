import { Ingredient } from '../../types/ingredient'

export interface modalContentType {
    isModal: null | 'order' | 'ingredient'
    content?: undefined | JSX.Element | JSX.Element[]
    ingredients?: Ingredient[]
}
