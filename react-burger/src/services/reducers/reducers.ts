import { combineReducers } from 'redux'

import { authReducer } from './authReducer'
import { ingredientsReducer } from './ingredientReducer'
import { orderReducer } from './orderReducer'
import { constructorReducer } from './constructorReducer'
import { modalReducer } from './modalReducer'
import { wsReducer } from './wsReducer'

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    modal: modalReducer,
    constructor: constructorReducer,
    auth: authReducer,
    ws: wsReducer,
})
