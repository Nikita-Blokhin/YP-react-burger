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
import { modalContentType } from '../../types/Modal'
import IngredientDetails from '../IngredientDetails/IngredientDetails'

interface BurgerConstructorProps {
    ingredients: Ingredient[]
    onRemoveIngredient?: (index: number) => void
    onOrderClick?: () => void
    setModalContent: React.Dispatch<React.SetStateAction<modalContentType>>
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({
    ingredients,
    onRemoveIngredient,
    onOrderClick,
    setModalContent
}) => {

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
        setModalContent({
            isModal: null,
            content: undefined
        })
    }

    const handleOrder = () => {
        if (ingredients.length > 0) {
            onOrderClick?.()
        }
    }

    return (
        <div className={styles.container}>

            {fillings.length === 0 && !bun && (
                <div className={styles.emptyState}>
                    <p className={styles.emptyText}>
                        Выберите ингредиенты для создания бургера
                    </p>
                </div>
            )}

            <div className={styles.constructorList}>
                {bun && (
                    <div className={clsx(styles.bunContainer, styles.bun)}
                        onClickCapture={() => setModalContent({
                            isModal: 'ingredient',
                            content: <IngredientDetails 
                                ingredient={bun}
                            />
                        })}
                    >
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
                            <div 
                                className={styles.bunContainer}
                                onClickCapture={() => setModalContent({
                                    isModal: 'ingredient',
                                    content: <IngredientDetails 
                                        ingredient={ingredient}
                                    />
                                })}
                            >
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
                        onClickCapture={() => setModalContent({
                            isModal: 'ingredient',
                            content: <IngredientDetails 
                                ingredient={bun}
                            />
                        })}
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
