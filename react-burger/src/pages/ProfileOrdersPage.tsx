import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '../hooks/reducerHook'
import CompletedOrder from '../components/CompletedOrder/CompletedOrder'
import {
    GET_ORDERS_FAILED,
    WS_CLOSE,
    WS_CONNECTION_START,
} from '../services/actions/wsAction'

import styles from './ProfileOrdersPage.module.css'
import { BASE_WS } from '../core/constants'
import { getAccessToken } from '../utils/auth'

const ProfileOrdersPage = () => {
    const dispatch = useAppDispatch()

    const { allOrders } = useAppSelector((state) => state.ws)

    useEffect(() => {
        const token = getAccessToken()
        if (!token) {
            console.error('отсутствует токен')
            dispatch({ type: GET_ORDERS_FAILED })
            return
        }

        dispatch({
            type: WS_CONNECTION_START,
            wsURL: `${BASE_WS}?token=${token}`,
        })

        return () => {
            dispatch({ type: WS_CLOSE })
        }
    }, [dispatch])

    return (
        <div className={styles.container}>
            <div className={styles.ordersSection}>
                <div className={styles.ordersList}>
                    {allOrders.length === 0 ? (
                        <p className={styles.emptyMessage}>
                            История заказов пуста
                        </p>
                    ) : (
                        allOrders.map((order, index) => {
                            return <CompletedOrder order={order} key={index} />
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileOrdersPage
