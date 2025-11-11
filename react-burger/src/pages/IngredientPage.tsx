import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { useAppSelector } from '../hooks/reducerHook'
import { getIngredients } from '../services/ingredientActions'

import styles from './IngredientPage.module.css'

const IngredientPage = () => {
    const { id } = useParams<{ id: string }>()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    )
    const ingredient = ingredients.find((item) => item._id === id)

    useEffect(() => {
        if (ingredients.length === 0) {
            dispatch(getIngredients() as any)
        }
    }, [dispatch, ingredients.length])

    useEffect(() => {
        if (ingredients.length > 0 && !ingredient) {
            navigate('/', { replace: true })
        }
    }, [ingredient, ingredients.length, navigate])

    if (!ingredient) {
        return (
            <div className={styles.loading}>
                <p>Загрузка...</p>
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Детали ингредиента</h1>
                <img
                    src={ingredient.image_large || '/images/placeholder.svg'}
                    alt={ingredient.name}
                    className={styles.ingredientImage}
                />
                <h3 className={styles.name}>{ingredient.name}</h3>
                <div className={styles.structure}>
                    <div className={styles.comp}>
                        <span className={styles.label}>Каллории, ккал</span>
                        <span className={styles.value}>
                            {ingredient.calories}
                        </span>
                    </div>
                    <div className={styles.comp}>
                        <span className={styles.label}>Белки, г</span>
                        <span className={styles.value}>
                            {ingredient.proteins}
                        </span>
                    </div>
                    <div className={styles.comp}>
                        <span className={styles.label}>Жиры, г</span>
                        <span className={styles.value}>{ingredient.fat}</span>
                    </div>
                    <div className={styles.comp}>
                        <span className={styles.label}>Углеводы, г</span>
                        <span className={styles.value}>
                            {ingredient.carbohydrates}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default IngredientPage
