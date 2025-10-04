import { GET_INGREDIENTS_URL } from './constants'

export class API {
    
    static getIngredients = async () => {
        const response = await fetch(GET_INGREDIENTS_URL)
        if (response.ok) return await response.json()
        return Promise.reject(`Ошибка ${response.status}`)
    }
}
