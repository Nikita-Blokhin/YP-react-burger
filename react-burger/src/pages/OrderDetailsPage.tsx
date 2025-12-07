import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import { useAppDispatch, useAppSelector } from '../hooks/reducerHook'
import { getOrder } from '../services/actions/wsAction'
import {
    getCorrectDate,
    getStatusColor,
    getStatusLabel,
    totalPrice,
} from '../utils/order'

import styles from './OrderDetailsPage.module.css'

const OrderDetailsPage = () => {
    const dispatch = useAppDispatch()
    const orderId = useParams<{ id: string }>()
    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    )
    const selectedOrder = useAppSelector((state) => state.ws.selectedOrder)

    useEffect(() => {
        orderId.id && dispatch(getOrder(orderId.id))
    }, [dispatch, orderId.id])

    return selectedOrder && ingredients ? (
        <div className={styles.order}>
            <div className={styles.header}>
                <h2>#{selectedOrder.number}</h2>
                <h5>{selectedOrder.name}</h5>
            </div>
            <div
                className={`${styles.status} ${getStatusColor(selectedOrder.status, styles)}`}
            >
                <span>{getStatusLabel(selectedOrder.status)}</span>
            </div>
            <div className={styles.ingredientesContainer}>
                <h5>Состав:</h5>
                <div className={styles.ingredients}>
                    {selectedOrder.ingredients ? (
                        Object.entries(
                            selectedOrder.ingredients.reduce(
                                (acc, item) => {
                                    acc[item] = (acc[item] || 0) + 1
                                    return acc
                                },
                                {} as { [s: string]: number }
                            )!
                        ).map(([element, count]) => {
                            const ingredient = ingredients.find(
                                (item) => item._id === element
                            )
                            return ingredient ? (
                                <div className={styles.card} key={element}>
                                    <div
                                        className={styles.ingredientImg}
                                        key={element}
                                    >
                                        <img
                                            src={ingredient.image}
                                            alt="ingr_img"
                                        />
                                    </div>
                                    <span className={styles.name}>
                                        {ingredient.name}
                                    </span>
                                    <div className={styles.price}>
                                        <span>
                                            {count} x {ingredient.price}
                                        </span>
                                        <CurrencyIcon
                                            type="primary"
                                            className={styles.icon}
                                        />
                                    </div>
                                </div>
                            ) : (
                                <h3
                                    className={styles.loading}
                                    key={`load${element}`}
                                >
                                    Загрузка...
                                </h3>
                            )
                        })
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className={styles.footer}>
                <span className={styles.orderDate}>
                    {getCorrectDate(selectedOrder.createdAt)}
                </span>
                <div className={styles.price}>
                    <span>
                        {totalPrice(selectedOrder.ingredients, ingredients)}
                    </span>
                    <CurrencyIcon type="primary" className={styles.icon} />
                </div>
            </div>
        </div>
    ) : (
        <h3 className={styles.loading}>Загрузка...</h3>
    )
}

export default OrderDetailsPage
