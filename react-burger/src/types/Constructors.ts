import {
    GET_INGREDIENTS_CONSTRUCTOR,
    ADD_INGREDIENT_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR,
    DELETE_INGREDIENT_CONSTRUCTOR,
} from '../services/actions/constructorActions'
import { POST_ORDER_SUCCESS } from '../services/actions/orderActions'
import { IIngredient } from './Ingredient'

export interface IGetIngredientsConstructor {
    readonly type: typeof GET_INGREDIENTS_CONSTRUCTOR
}

export interface IAddIngredientConstructor {
    readonly type: typeof ADD_INGREDIENT_CONSTRUCTOR
    readonly ingredient: IIngredient
}

export interface IMoveIngredientConstructor {
    readonly type: typeof MOVE_INGREDIENT_CONSTRUCTOR
    readonly dragIndex: number
    readonly hoverIndex: number
}

export interface IDeleteIngredientConstructor {
    readonly type: typeof DELETE_INGREDIENT_CONSTRUCTOR
    readonly indexConstructor: number
}

export interface IConstructorPostOrderSucces {
    readonly type: typeof POST_ORDER_SUCCESS
}

export type TConstructorActions =
    | IGetIngredientsConstructor
    | IAddIngredientConstructor
    | IMoveIngredientConstructor
    | IDeleteIngredientConstructor
    | IConstructorPostOrderSucces
