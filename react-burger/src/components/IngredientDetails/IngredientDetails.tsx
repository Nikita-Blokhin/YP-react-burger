import Modal from '../Modal/Modal'
import { useAppSelector } from '../../hooks/reducerHook'

import styles from './IngredientDetails.module.css'

const IngredientDetails = () => {

    const ingredient = useAppSelector(state => state.ingredientDetail)!

    return (<Modal title={'Детали ингредиента'}>
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
    </Modal>)
}

export default IngredientDetails
