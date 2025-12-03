import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/reducerHook'
import { MODAL_OPEN_ORDER_INFO } from '../../services/actions/modalActions'
import { IOrder } from '../../types'
import {
    getStatusColor,
    getStatusLabel,
    getCorrectDate,
    totalPrice,
} from '../../utils/order'

import styles from './OrderInfoDetails.module.css'

const OrderInfoDetails = () => {
    const dispatch = useAppDispatch()
    const orderId = useParams<{ id: string }>()
    const location = useLocation()
    const orderProfile = useAppSelector((state) => state.ws.allOrders)
    const orderFeed = useAppSelector((state) => state.ws.allOrders)
    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    )
    const [currentOrder, setCurrentOrder] = useState<IOrder | undefined>(
        undefined
    )

    useEffect(() => {
        location.pathname.includes('feed')
            ? setCurrentOrder(
                  orderFeed.find((item) => item.number === Number(orderId.id))
              )
            : setCurrentOrder(
                  orderProfile.find(
                      (item) => item.number === Number(orderId.id)
                  )
              )
    }, [location.pathname, orderFeed, orderId, orderProfile])

    useEffect(() => {
        currentOrder &&
            dispatch({
                type: MODAL_OPEN_ORDER_INFO,
                title: `#${currentOrder.number}`,
            })
    }, [dispatch, currentOrder])

    return currentOrder ? (
        <div className={styles.order}>
            <div className={styles.header}>
                <h5>{currentOrder?.name}</h5>
            </div>
            <div
                className={`${styles.status} ${getStatusColor(currentOrder!.status, styles)}`}
            >
                <span>{getStatusLabel(currentOrder.status)}</span>
            </div>
            <div className={styles.ingredientesContainer}>
                <h5>Состав:</h5>
                <div className={styles.ingredients}>
                    {Object.entries(
                        currentOrder?.ingredients.reduce(
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
                        return (
                            <div className={styles.card} key={element}>
                                <div
                                    className={styles.ingredientImg}
                                    key={element}
                                >
                                    <img
                                        src={ingredient!.image_mobile!}
                                        alt="ingr_img"
                                    />
                                </div>
                                <span className={styles.name}>
                                    {ingredient!.name}
                                </span>
                                <div className={styles.price}>
                                    <span>
                                        {count} x {ingredient?.price}
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
                    {getCorrectDate(currentOrder.createdAt)}
                </span>
                <div className={styles.price}>
                    <span>
                        {totalPrice(currentOrder.ingredients, ingredients)}
                    </span>
                    <CurrencyIcon type="primary" className={styles.icon} />
                </div>
            </div>
        </div>
    ) : (
        <h6>Загрузка...</h6>
    )
}

export default OrderInfoDetails
