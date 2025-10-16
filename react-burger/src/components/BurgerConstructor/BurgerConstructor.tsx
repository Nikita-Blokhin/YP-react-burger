import clsx from 'clsx'
import { 
    ConstructorElement, 
    Button, 
    CurrencyIcon
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'

import { Ingredient } from '../../types/Ingredient'
import { DragItem, INGREDIENT_TYPE } from '../../types/DrugItem'
import { 
    addIngridient,
    DELETE_INGREDIENT_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR,
    postOrder
} from '../../services/actions'
import OrderDetails from '../OrderDetails/OrderDetails'
import ConstructorIngredient from './ConstructorIngredient'
import { useAppDispatch, useAppSelector } from '../../hooks/reducerHook'

import styles from './BurgerConstructor.module.css'

const BurgerConstructor = () => {

    const dispatch = useAppDispatch()
    const ingredients = useAppSelector(state => state.ingredientsConstructor)
    const isModal = useAppSelector(state => state.isModalOrder)

    const onDropIngredient = (ingredient: Ingredient) => {
        dispatch(addIngridient(ingredient))
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
            ? 'rgba(76, 76, 255, 0.1)' 
            : 'transparent',
        border: canDrop ? '2px dashed rgba(76, 76, 255, 0.5)' : 'none',
        borderRadius: '12px',
        transition: 'all 0.3s ease'
    }

    const handleOrder = async () => {
        dispatch(postOrder(ingredients))
    }

    const handleReorderIngredients = (
        dragIndex: number, hoverIndex: number
    ) => {
        dispatch({
            type: MOVE_INGREDIENT_CONSTRUCTOR, dragIndex: dragIndex,
            hoverIndex: hoverIndex 
        })
    }

    return (
        <div className={styles.container} ref={dropRef} style={dropAreaStyle}>
            {isModal && <OrderDetails />}
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
                            type='top'
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
                        <ConstructorIngredient
                            key={ingredient.uniqueId}
                            ingredient={ingredient}
                            index={index}
                            moveIngredient={handleReorderIngredients}
                            onRemove={handleRemove}
                        />
                    ))}
                </div>

                {bun && (
                    <div 
                        className={clsx(
                            styles.bunContainer, styles.bottom, styles.bun
                        )}
                    >
                        <ConstructorElement
                            type='bottom'
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
                    <CurrencyIcon type='primary' />
                </div>
                <Button 
                    htmlType='button' 
                    type='primary' 
                    size='large'
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
