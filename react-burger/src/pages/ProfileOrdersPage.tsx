import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../hooks/reducerHook'
import CompletedOrder from '../components/CompletedOrder/CompletedOrder'
import { WS_CLOSE, WS_CONNECTION_START } from '../services/actions/wsAction'

import styles from './ProfileOrdersPage.module.css'

const ProfileOrdersPage = () => {
    const dispatch = useAppDispatch()
    const location = useLocation()

    const { userOrders } = useAppSelector((state) => state.ws)

    useEffect(() => {
        location.pathname.includes('profile/orders') &&
            dispatch({ type: WS_CONNECTION_START, typeConnected: 'profile' })

        return () => {
            dispatch({ type: WS_CLOSE })
        }
    }, [dispatch, location.pathname])

    return (
        <div className={styles.container}>
            <div className={styles.ordersSection}>
                <div className={styles.ordersList}>
                    {userOrders.length === 0 ? (
                        <p className={styles.emptyMessage}>
                            История заказов пуста
                        </p>
                    ) : (
                        userOrders.map((order, index) => {
                            return <CompletedOrder order={order} key={index} />
                        })
                    )}
                </div>
            </div>
        </div>
    )
}

export default ProfileOrdersPage
