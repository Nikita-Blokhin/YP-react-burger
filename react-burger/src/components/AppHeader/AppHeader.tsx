import React from 'react'
import {
    Logo, BurgerIcon, ListIcon, ProfileIcon 
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './AppHeader.module.css'

const AppHeader: React.FC = () => {

    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.leftSection}>
                    <div className={styles.navItem}>
                        <BurgerIcon type='primary' />
                        <span className={styles.navText}>Конструктор</span>
                    </div>
                    <div className={styles.navItem}>
                        <ListIcon type='secondary' />
                        <span className={styles.navTextSecondary}>
                            Лента заказов
                        </span>
                    </div>
                </div>
                
                <div className={styles.logoContainer}>
                    <Logo />
                </div>
                
                <div className={styles.rightSection}>
                    <div className={styles.navItem}>
                        <ProfileIcon type='secondary' />
                        <span className={styles.navTextSecondary}>
                            Личный кабинет
                        </span>
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader
