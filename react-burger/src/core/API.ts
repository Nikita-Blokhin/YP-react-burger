import { useDispatch } from 'react-redux'
import { GET_INGREDIENTS_URL } from './constants'
import { GET_INGREDIENTS_FAILED } from '../services/actions'

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
}
