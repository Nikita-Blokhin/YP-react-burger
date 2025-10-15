import { CREATE_ORDER_URL, GET_INGREDIENTS_URL } from './constants'
import { request } from '../utils'

export class API {
    
    static getIngredients = async () => {
        return await request(GET_INGREDIENTS_URL)
    }

    static createOrder = async (data: string[]) => {
        return await request(CREATE_ORDER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({'ingredients': data}),
        })
    }
}
