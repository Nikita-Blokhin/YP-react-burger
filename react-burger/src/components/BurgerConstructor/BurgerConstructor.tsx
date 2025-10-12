import React from 'react'
import clsx from 'clsx'
import { 
    ConstructorElement, 
    DragIcon, 
    Button, 
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux'
import { useDrop } from 'react-dnd'

import { Ingredient } from '../../types/Ingredient'
import styles from './BurgerConstructor.module.css'
import { DragItem, INGREDIENT_TYPE } from '../../types/DrugItem'
import { State } from '../../types/Services'
import { ADD_INGREDIENT_CONSTRUCTOR, DELETE_INGREDIENT_CONSTRUCTOR } from '../../services/actions'

const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const ingredients = useSelector(
        (state: State) => state.ingredientsConstructor
    )

    const onDropIngredient = (ingredient: Ingredient) => {
        dispatch({type: ADD_INGREDIENT_CONSTRUCTOR, id: ingredient._id})
    }
    
    const [{ isOver, canDrop }, dropRef] = useDrop<
        DragItem, unknown, { isOver: boolean; canDrop: boolean }
        >({
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
        dispatch(
            {type: DELETE_INGREDIENT_CONSTRUCTOR, indexConstructor: index}
        )
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
                        ingredient: Ingredient, index
                    ) => (
                        <div
                            key={`${ingredient._id} -${index}`}
                            className={styles.fillingItem}
                        >
                            <DragIcon type="primary" />
                            <div className={styles.bunContainer}>
                                <ConstructorElement
                                    text={ingredient.name}
                                    price={ingredient.price}
                                    thumbnail={ingredient.image}
                                    handleClose={
                                        () => handleRemove(index)
                                    }
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
