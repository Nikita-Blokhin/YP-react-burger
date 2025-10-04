import { Ingredient } from '../../types/Ingredient'
import styles from './IngredientDetails.module.css'

interface IngredientDetailsProps {
    ingredient: Ingredient
}

const IngredientDetails = ({ingredient}: IngredientDetailsProps) => {
    
    return (
        <div className={styles.content}>
            <img 
                src={ingredient.image} 
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
        </div>
    )
}

export default IngredientDetails
