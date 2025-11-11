import { NavLink } from 'react-router-dom'
import {
    Logo,
    BurgerIcon,
    ListIcon,
    ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './AppHeader.module.css'

const AppHeader = () => {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.leftSection}>
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            isActive ? styles.navItemActive : styles.navItem
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <BurgerIcon
                                    type={isActive ? 'primary' : 'secondary'}
                                />
                                <span
                                    className={
                                        isActive
                                            ? styles.navText
                                            : styles.navTextSecondary
                                    }
                                >
                                    Конструктор
                                </span>
                            </>
                        )}
                    </NavLink>
                    <div className={styles.navItem}>
                        <ListIcon type="secondary" />
                        <span className={styles.navTextSecondary}>
                            Лента заказов
                        </span>
                    </div>
                </div>

                <NavLink to="/" className={styles.logoContainer}>
                    <Logo />
                </NavLink>

                <div className={styles.rightSection}>
                    <NavLink
                        to="/profile"
                        className={({ isActive }) =>
                            isActive ? styles.navItemActive : styles.navItem
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <ProfileIcon
                                    type={isActive ? 'primary' : 'secondary'}
                                />
                                <span
                                    className={
                                        isActive
                                            ? styles.navText
                                            : styles.navTextSecondary
                                    }
                                >
                                    Личный кабинет
                                </span>
                            </>
                        )}
                    </NavLink>
                </div>
            </nav>
        </header>
    )
}

export default AppHeader
