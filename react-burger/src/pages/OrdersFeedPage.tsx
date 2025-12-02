import { useEffect, useMemo } from 'react'
import clsx from 'clsx'

import { useAppDispatch, useAppSelector } from '../hooks/reducerHook'
import type { IOrder } from '../types/Order'
import CompletedOrder from '../components/CompletedOrder/CompletedOrder'
import { WS_CLOSE, WS_CONNECTION_START } from '../services/actions/wsAction'

import styles from './OrdersFeedPage.module.css'

const OrdersFeedPage = () => {
    const dispatch = useAppDispatch()
    const { allOrders, total, totalToday } = useAppSelector(
        (state) => state.ws
    )

    useEffect(() => {
        dispatch({ type: WS_CONNECTION_START, typeConnected: 'feed' })

        return () => {
            dispatch({ type: WS_CLOSE })
        }
    }, [dispatch])

    const organizedOrders = useMemo(() => {
        const done: IOrder[] = []
        const inWork: IOrder[] = []

        allOrders.forEach((order) => {
            if (order.status === 'done' && done.length < 10) {
                done.push(order)
            } else if (
                (order.status === 'created' || order.status === 'pending') &&
                inWork.length < 10
            ) {
                inWork.push(order)
            }
        })

        return { done, inWork }
    }, [allOrders])

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Лента заказов</h1>

            <div className={styles.content}>
                <div className={styles.ordersList}>
                    {allOrders.slice(0, 20).map((order, index) => {
                        return (
                            <CompletedOrder
                                order={order}
                                isFeed={true}
                                key={index}
                            />
                        )
                    })}
                </div>

                <div className={styles.right}>
                    <div className={styles.ordersColumns}>
                        <div className={styles.column}>
                            <h2 className={styles.columnTitle}>Готовы:</h2>
                            <div className={styles.orderNumbersList}>
                                {organizedOrders.done.map((order, index) => (
                                    <span
                                        className={clsx(
                                            styles.OrderNumber,
                                            styles.done
                                        )}
                                        key={index}
                                    >
                                        {order.number}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className={styles.column}>
                            <h2 className={styles.columnTitle}>В работе:</h2>
                            <div className={styles.orderNumbersList}>
                                {organizedOrders.inWork.map((order) => (
                                    <span className={styles.OrderNumber}>
                                        {order.number}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>
                            Выполнено за все время:
                        </p>
                        <p className={styles.statValue}>{total}</p>
                    </div>
                    <div className={styles.statCard}>
                        <p className={styles.statLabel}>
                            Выполнено за сегодня:
                        </p>
                        <p className={styles.statValue}>{totalToday}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrdersFeedPage
