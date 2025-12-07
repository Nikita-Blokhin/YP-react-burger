import {
    MODAL_OPEN_INGREDIENT,
    MODAL_OPEN_ORDER,
    MODAL_CLOSE,
    MODAL_OPEN_ORDER_INFO,
} from '../services/actions/modalActions'
import { IIngredient } from './Ingredient'

export interface IModalContentType {
    isModal: null | 'order' | 'ingredient'
    content?: undefined | JSX.Element | JSX.Element[]
    ingredients?: IIngredient[]
    ingredient?: null | IIngredient
}

export interface IModalOpenIngredient {
    readonly type: typeof MODAL_OPEN_INGREDIENT
    readonly ingredientDetail: IIngredient
}

export interface IModalOpenOrder {
    readonly type: typeof MODAL_OPEN_ORDER
}

export interface IModalOpenOrderInfo {
    readonly type: typeof MODAL_OPEN_ORDER_INFO
    readonly title: string
}

export interface IModalClose {
    readonly type: typeof MODAL_CLOSE
}

export type TModalActions =
    | IModalOpenOrderInfo
    | IModalOpenIngredient
    | IModalOpenOrder
    | IModalClose
