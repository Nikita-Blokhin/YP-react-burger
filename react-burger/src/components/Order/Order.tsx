import styles from './Order.module.css'

const Order = () => {
    return (
        <div className={styles.order}>
            <h1 className={styles.orderNumber}>034536</h1>
            <h5>идентификатор заказа</h5>
            <img src='/images/ok.svg' alt='ok' />
            <h6>Ваш заказ начали готовить</h6>
            <h6 style={{color: '#8585AD'}}>
                Дождитесь готовности на орбитальной станции
            </h6>
        </div>
    )
}

export default Order
