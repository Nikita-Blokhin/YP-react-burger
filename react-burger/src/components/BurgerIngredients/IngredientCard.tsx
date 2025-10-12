import type React from "react"
import { useDrag } from "react-dnd"
import { 
    Counter, CurrencyIcon 
} from "@ya.praktikum/react-developer-burger-ui-components"

import type { Ingredient } from "../../types/Ingredient"
import styles from "./BurgerIngredients.module.css"
import { DragItem, INGREDIENT_TYPE } from '../../types/DrugItem'

interface IngredientCardProps {
    ingredient: Ingredient
    onClick: (ingredient: Ingredient) => void
    getIngredientCount: (ingredient: Ingredient) => number
}

const IngredientCard: React.FC<IngredientCardProps> = ({ 
    ingredient, getIngredientCount, onClick 
}) => {
    const [{ isDragging }, dragRef] = useDrag<
        DragItem, unknown, {isDragging: boolean}
    > ({
        type: INGREDIENT_TYPE,
        item: { type: INGREDIENT_TYPE, ingredient },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    return (
        <div 
            className={styles.ingredientCard}
            onClick={
                () => onClick(ingredient)
            }
            ref={dragRef}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: "move",
            }}
        >
            {getIngredientCount(ingredient) > 0 && (
                <Counter count={getIngredientCount(ingredient)}
                    size='default' 
                />
            )}
            <img 
                src={ingredient.image} 
                alt={ingredient.name}
                className={styles.ingredientImage}
            />
            <div className={styles.priceContainer}>
                <span className={styles.price}>{ingredient.price}</span>
                <CurrencyIcon type='primary' />
            </div>
            <p className={styles.ingredientName}>{ingredient.name}</p>
        </div>
    )
}

export default IngredientCard
