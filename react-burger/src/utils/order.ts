import { IIngredient } from '../types'

export const getStatusLabel = (status: string) => {
    switch (status) {
        case 'done':
            return 'Выполнен'
        case 'pending':
            return 'Готовится'
        case 'created':
            return 'Принят'
        default:
            return status
    }
}

export const getStatusColor = (
    status: string,
    styles: { [key: string]: string }
) => {
    switch (status) {
        case 'done':
            return styles.statusDone
        default:
            return ''
    }
}

export const getCorrectDate = (date: string) => {
    return new Date(date).toLocaleString('ru-RU', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    })
}

export const totalPrice = (
    idIngredients: string[],
    ingredients: IIngredient[]
) => {
    let price = 0
    idIngredients.map((item) => {
        const current = ingredients.find((ingr) => ingr._id === item)
        if (current?.type === 'bun') {
            return (price += current?.price! * 2)
        }
        return String((price += current?.price!))
    })
    return String(price)
}
