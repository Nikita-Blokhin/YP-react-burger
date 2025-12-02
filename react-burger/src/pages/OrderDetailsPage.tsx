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
        dispatch(getOrder(orderId.id!))
    }, [dispatch, orderId.id, selectedOrder])

    return selectedOrder ? (
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
                    {selectedOrder.ingredients.map((item, index) => {
                        const ingredient = ingredients.find(
                            (ingr) => ingr._id === item
                        )
                        return !ingredient ? (
                            <h3 key={'loading'}>Загрузка...</h3>
                        ) : (
                            <div className={styles.card} key={index}>
                                <div
                                    className={styles.ingredientImg}
                                    key={item}
                                >
                                    <img
                                        src={ingredient?.image}
                                        alt="ingr_img"
                                    />
                                </div>
                                <span className={styles.name}>
                                    {ingredient?.name}
                                </span>
                                <div className={styles.price}>
                                    <span>
                                        {ingredient?.type === 'bun'
                                            ? '2 '
                                            : '1 '}
                                        x {ingredient?.price}
                                    </span>
                                    <CurrencyIcon
                                        type="primary"
                                        className={styles.icon}
                                    />
                                </div>
                            </div>
                        )
                    })}
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
        <h6>Загрузка...</h6>
    )
}

export default OrderDetailsPage
