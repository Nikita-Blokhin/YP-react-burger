import styles from './OrderDetails.module.css'

const OrderDetails = () => {
    
    return (
        <div className={styles.order}>
            <h2 className={styles.orderNumber}>034536</h2>
            <h5>идентификатор заказа</h5>
            <img src='/images/ok.svg' alt='ok' />
            <h6>Ваш заказ начали готовить</h6>
            <h6 className={styles.wait}>
                Дождитесь готовности на орбитальной станции
            </h6>
        </div>
    )
}

export default OrderDetails
