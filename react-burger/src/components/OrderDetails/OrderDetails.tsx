import Modal from '../Modal/Modal'
import { useAppSelector } from '../../hooks/reducerHook'

import styles from './OrderDetails.module.css'

const OrderDetails = () => {
    const order = useAppSelector((state) => state.order.order)

    return (
        order && (
            <Modal>
                <div className={styles.order}>
                    <h2 className={styles.orderNumber}>
                        {order.order?.number}
                    </h2>
                    <h5>идентификатор заказа</h5>
                    <img src="/images/ok.svg" alt="ok" />
                    <h6>Ваш заказ начали готовить</h6>
                    <h6 className={styles.wait}>
                        Дождитесь готовности на орбитальной станции
                    </h6>
                </div>
            </Modal>
        )
    )
}

export default OrderDetails
