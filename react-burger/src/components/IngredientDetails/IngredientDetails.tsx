import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../hooks/reducerHook'

import styles from './IngredientDetails.module.css'

const IngredientDetails = () => {
    const { id } = useParams<{ id: string }>()
    const ingredient = useAppSelector(
        (state) => state.ingredients.ingredients
    )!.find((ingredient) => id === ingredient._id)

    return (
        <div className={styles.content} data-testid="ingredient-details">
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
                        data-testid="ingredient-image"
                    />
                    <h3 data-testid="ingredient-name">{ingredient.name}</h3>
                    <div className={styles.structure}>
                        <div className={styles.comp}>
                            <span>Каллории, ккал</span>
                            <span data-testid="ingredient-calories">
                                {ingredient.calories}
                            </span>
                        </div>
                        <div className={styles.comp}>
                            <span>Белки, г</span>
                            <span data-testid="ingredient-proteins">
                                {ingredient.proteins}
                            </span>
                        </div>
                        <div className={styles.comp}>
                            <span>Жиры, г</span>
                            <span data-testid="ingredient-fat">
                                {ingredient.fat}
                            </span>
                        </div>
                        <div className={styles.comp}>
                            <span>Углеводы, г</span>
                            <span data-testid="ingredient-carbohydrates">
                                {ingredient.carbohydrates}
                            </span>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default IngredientDetails
