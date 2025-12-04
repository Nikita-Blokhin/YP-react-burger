import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import clsx from 'clsx'

import { IOrder } from '../../types/Order'
import { useAppSelector } from '../../hooks/reducerHook'
import {
    getCorrectDate,
    getStatusColor,
    getStatusLabel,
    totalPrice,
} from '../../utils/order'

import styles from './CompletedOrder.module.css'

interface ICompletedOrderProps {
    order: IOrder
    isFeed?: boolean
}

const CompletedOrder = ({ order, isFeed = false }: ICompletedOrderProps) => {
    const location = useLocation()
    const navigate = useNavigate()
    const targetRef = useRef<HTMLDivElement>(null)
    const ingredients = useAppSelector(
        (state) => state.ingredients.ingredients
    )

    useEffect(() => {
        !isFeed &&
            targetRef.current?.scrollIntoView({
                behavior: 'smooth',
            })
    }, [isFeed])

    const handleOrderClick = (orderId: number) => {
        isFeed
            ? navigate(`/feed/${orderId}`, {
                  state: { background: location },
              })
            : navigate(`/profile/orders/${orderId}`, {
                  state: { background: location },
              })
    }

    return (
        ingredients && (
            <button
                key={order._id}
                className={clsx(
                    styles.orderItem,
                    isFeed && styles.orderItemFeed
                )}
                onClick={() => handleOrderClick(order.number)}
            >
                <div className={styles.orderHeader}>
                    <span className={styles.orderId}>#{order.number}</span>
                    <span className={styles.orderDate}>
                        {getCorrectDate(order.createdAt)}
                    </span>
                </div>
                <h3
                    className={clsx(
                        styles.orderName,
                        isFeed && styles.orderNameFeed
                    )}
                >
                    {order.name}
                </h3>
                {!isFeed && (
                    <div
                        className={`${styles.status} ${getStatusColor(order.status, styles)}`}
                    >
                        <span>{getStatusLabel(order.status)}</span>
                    </div>
                )}
                <div
                    className={clsx(
                        styles.ingredientsContainer,
                        isFeed && styles.ingredientsContainerFeed
                    )}
                >
                    <div className={styles.ingredients} ref={targetRef}>
                        {order.ingredients.length < 7
                            ? order.ingredients.map((item, index) => {
                                  return (
                                      <div
                                          className={styles.ingredient}
                                          key={index}
                                      >
                                          <img
                                              src={
                                                  ingredients.find(
                                                      (ingr) =>
                                                          ingr._id === item
                                                  )?.image_mobile!
                                              }
                                              alt="ingr_img"
                                          />
                                      </div>
                                  )
                              })
                            : order.ingredients
                                  .slice(0, 5)
                                  .map((item, index) => {
                                      return (
                                          <div
                                              className={styles.ingredient}
                                              key={index}
                                          >
                                              <img
                                                  src={
                                                      ingredients.find(
                                                          (ingr) =>
                                                              ingr._id === item
                                                      )?.image_mobile!
                                                  }
                                                  alt="ingr_img"
                                              />
                                          </div>
                                      )
                                  })}
                        {order.ingredients.length > 6 && (
                            <div className={styles.ingredient}>
                                <img
                                    src={
                                        ingredients.find(
                                            (ingr) =>
                                                ingr._id ===
                                                order.ingredients[5]
                                        )?.image_mobile!
                                    }
                                    alt="ingr_img"
                                />
                                <div className={styles.other}>
                                    <span>
                                        +{order.ingredients.length - 5}
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className={styles.price}>
                        <span>
                            {totalPrice(order.ingredients, ingredients)}
                        </span>
                        <CurrencyIcon type="primary" className={styles.icon} />
                    </div>
                </div>
            </button>
        )
    )
}

export default CompletedOrder
