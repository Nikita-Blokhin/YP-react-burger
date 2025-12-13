import type React from 'react'
import { useDrag } from 'react-dnd'
import {
    Counter,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import type { IIngredient } from '../../types/Ingredient'
import { IDragItem, INGREDIENT_TYPE } from '../../types/DrugItem'

import styles from './BurgerIngredients.module.css'

interface IIngredientCardProps {
    ingredient: IIngredient
    onClick: (ingredient: IIngredient) => void
    getIngredientCount: (ingredient: IIngredient) => number
}

const IngredientCard: React.FC<IIngredientCardProps> = ({
    ingredient,
    getIngredientCount,
    onClick,
}) => {
    const [{ isDragging }, dragRef] = useDrag<
        IDragItem,
        unknown,
        { isDragging: boolean }
    >({
        type: INGREDIENT_TYPE,
        item: { type: INGREDIENT_TYPE, ingredient },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    return (
        <div
            className={styles.ingredientCard}
            onClick={() => onClick(ingredient)}
            ref={dragRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
            data-testid="ingredient-card"
            data-ingredient-id={ingredient._id}
            data-ingredient-type={ingredient.type}
        >
            {getIngredientCount(ingredient) > 0 && (
                <Counter
                    count={getIngredientCount(ingredient)}
                    size="default"
                />
            )}
            <img
                src={ingredient.image}
                alt={ingredient.name}
                className={styles.ingredientImage}
            />
            <div className={styles.priceContainer}>
                <span className={styles.price}>{ingredient.price}</span>
                <CurrencyIcon type="primary" />
            </div>
            <p className={styles.ingredientName}>{ingredient.name}</p>
        </div>
    )
}

export default IngredientCard
