import { useDispatch } from 'react-redux'

import { CREATE_ORDER_URL, GET_INGREDIENTS_URL } from './constants'
import { GET_INGREDIENTS_FAILED, POST_ORDER_FAILED } from '../services/actions'

export class API {
    
    static getIngredients = async () => {
        const response = await fetch(GET_INGREDIENTS_URL)
        if (response.ok) return await response.json()
        const dispatch = useDispatch()
        dispatch({
            type: GET_INGREDIENTS_FAILED
        })
        return Promise.reject(`Ошибка ${response.status}`)
    }

    static createOrder = async (data: string[]) => {
        const response = await fetch(CREATE_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'ingredients': data}),
        })
        if (response.ok) return await response.json()
        const dispatch = useDispatch()
        dispatch({
            type: POST_ORDER_FAILED
        })
        return Promise.reject(`Ошибка ${response.status}`)
    }
}
