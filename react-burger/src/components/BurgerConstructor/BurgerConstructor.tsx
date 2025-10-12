import React from 'react'
import clsx from 'clsx'
import { 
    ConstructorElement, 
    DragIcon, 
    Button, 
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'

import { Ingredient } from '../../types/Ingredient'
import styles from './BurgerConstructor.module.css'
import { useDrop } from 'react-dnd'
import { DragItem, INGREDIENT_TYPE } from '../../types/DrugItem'

interface BurgerConstructorProps {
    ingredients: Ingredient[]
    onRemoveIngredient?: (index: number) => void
    onOrderClick?: () => void
    onDropIngredient?: (ingredient: Ingredient) => void
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
    ingredients,
    onRemoveIngredient,
    onOrderClick,
    onDropIngredient
}) => {
    const [{ isOver, canDrop }, dropRef] = useDrop<DragItem, unknown, { isOver: boolean; canDrop: boolean }>({
            accept: INGREDIENT_TYPE,
            drop: (item) => {
            onDropIngredient?.(item.ingredient)
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop(),
        }),
    })

    const bun = ingredients.find
        ((ingredient: { type: string; }) => ingredient.type === 'bun')

    const fillings = ingredients.filter
        ((ingredient: { type: string; }) => ingredient.type !== 'bun')
        
    const totalPrice = ingredients.reduce
        ((sum: any, ingredient: { type: string; price: number; }) => {
            return sum + (ingredient.type === 'bun'
                ? ingredient.price * 2
                : ingredient.price
            )
        }, 0)

    const handleRemove = (index: number) => {
        onRemoveIngredient?.(index)
    }

    const dropAreaStyle = {
        backgroundColor: isOver && canDrop 
            ? "rgba(76, 76, 255, 0.1)" 
            : "transparent",
        border: canDrop ? "2px dashed rgba(76, 76, 255, 0.5)" : "none",
        borderRadius: "12px",
        transition: "all 0.3s ease"
    }

    const handleOrder = () => {
        if (ingredients.length > 0) onOrderClick?.()
    }

    return (
        <div className={styles.container} ref={dropRef} style={dropAreaStyle}>

            {fillings.length === 0 && !bun && (
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>
                        Выберите ингредиенты для создания бургера
                    </p>
                </div>
            )}

            <div className={styles.constructorList}>
                {bun && (
                    <div className={clsx(styles.bunContainer, styles.bun)}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={`${bun.name} (верх)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                )}

                <div className={styles.fillingsContainer}>
                            
                    {fillings.map((
                        ingredient, index
                    ) => (
                        <div
                            key={`${ingredient._id}-${index}`}
                            className={styles.fillingItem}
                        >
                            <DragIcon type="primary" />
                            <div className={styles.bunContainer}>
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={() => handleRemove(index)}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {bun && (
                    <div 
                        className={clsx(
                            styles.bunContainer, styles.bottom, styles.bun
                        )}
                    >
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={`${bun.name} (низ)`}
                            price={bun.price}
                            thumbnail={bun.image}
                        />
                    </div>
                )}
            </div>

            <div className={styles.orderSection}>
                <div className={styles.totalPrice}>
                    <span className={styles.price}>{totalPrice}</span>
                    <CurrencyIcon type="primary" />
                </div>
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="large"
                    onClick={handleOrder}
                    disabled={ingredients.length === 0}
                >
                    Оформить заказ
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor
