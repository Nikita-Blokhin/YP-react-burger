import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../hooks/reducerHook'

import styles from './IngredientDetails.module.css'

const IngredientDetails = () => {
    const { id } = useParams<{ id: string }>()
    const ingredient = useAppSelector(
        (state) => state.ingredients.ingredients
    )!.find((ingredient) => id === ingredient._id)

    return (
        <div className={styles.content}>
            {!ingredient ? (
                <h3>Загрузка...</h3>
            ) : (
                <>
                    <img
                        src={
                            ingredient.image_large || '/images/placeholder.svg'
                        }
                        alt={ingredient.name}
                        className={styles.ingredientImage}
                    />
                    <h3>{ingredient.name}</h3>
                    <div className={styles.structure}>
                        <div className={styles.comp}>
                            <span>Каллории, ккал</span>
                            <span>{ingredient.calories}</span>
                        </div>
                        <div className={styles.comp}>
                            <span>Белки, г</span>
                            <span>{ingredient.proteins}</span>
                        </div>
                        <div className={styles.comp}>
                            <span>Жиры, г</span>
                            <span>{ingredient.fat}</span>
                        </div>
                        <div className={styles.comp}>
                            <span>Углеводы, г</span>
                            <span>{ingredient.carbohydrates}</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default IngredientDetails
