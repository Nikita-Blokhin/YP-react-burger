import clsx from 'clsx'
import {
    ConstructorElement,
    Button,
    CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useDrop } from 'react-dnd'
import { useNavigate } from 'react-router-dom'

import type { IIngredient } from '../../types/Ingredient'
import { type IDragItem, INGREDIENT_TYPE } from '../../types/DrugItem'

import OrderDetails from '../OrderDetails/OrderDetails'
import ConstructorIngredient from './ConstructorIngredient'
import { useAppDispatch, useAppSelector } from '../../hooks/reducerHook'
import {
    addIngridient,
    DELETE_INGREDIENT_CONSTRUCTOR,
    MOVE_INGREDIENT_CONSTRUCTOR,
} from '../../services/actions/constructorActions'
import { postOrder } from '../../services/actions/orderActions'

import styles from './BurgerConstructor.module.css'

const BurgerConstructor = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const ingredients = useAppSelector(
        (state) => state.burgerConstructor.ingredientsConstructor
    )
    const isModal = useAppSelector((state) => state.modal.isModalOrder)
    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    )
    const isPostOrderLoaded = useAppSelector(
        (state) => state.order.orderRequest
    )

    const onDropIngredient = (ingredient: IIngredient) => {
        dispatch(addIngridient(ingredient))
    }

    const [{ isOver, canDrop }, dropRef] = useDrop<
        IDragItem,
        unknown,
        { isOver: boolean; canDrop: boolean }
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

    const bun = ingredients?.find(
        (ingredient: { type: string }) => ingredient.type === 'bun'
    )

    const fillings = ingredients?.filter(
        (ingredient: { type: string }) => ingredient.type !== 'bun'
    )

    const totalPrice = ingredients?.reduce(
        (sum: any, ingredient: { type: string; price: number }) => {
            return (
                sum +
                (ingredient.type === 'bun'
                    ? ingredient.price * 2
                    : ingredient.price)
            )
        },
        0
    )

    const handleRemove = (index: number) => {
        dispatch({
            type: DELETE_INGREDIENT_CONSTRUCTOR,
            indexConstructor: index,
        })
    }

    const dropAreaStyle = {
        backgroundColor:
            isOver && canDrop ? 'rgba(76, 76, 255, 0.1)' : 'transparent',
        border: canDrop ? '2px dashed rgba(76, 76, 255, 0.5)' : 'none',
        borderRadius: '12px',
        transition: 'all 0.3s ease',
    }

    const handleOrder = async () => {
        isAuthenticated
            ? dispatch(postOrder(ingredients))
            : navigate('/login', { replace: true })
    }

    const handleReorderIngredients = (
        dragIndex: number,
        hoverIndex: number
    ) => {
        dispatch({
            type: MOVE_INGREDIENT_CONSTRUCTOR,
            dragIndex: dragIndex,
            hoverIndex: hoverIndex,
        })
    }

    return (
        <div className={styles.container} ref={dropRef} style={dropAreaStyle}>
            {isModal && <OrderDetails />}
            {fillings?.length === 0 && !bun && (
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
                    {fillings?.map((ingredient: IIngredient, index) => (
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
                            styles.bunContainer,
                            styles.bottom,
                            styles.bun
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
                    disabled={ingredients?.length === 0 || isPostOrderLoaded}
                >
                    {isPostOrderLoaded ? 'Оформление...' : 'Оформить заказ'}
                </Button>
            </div>
        </div>
    )
}

export default BurgerConstructor
