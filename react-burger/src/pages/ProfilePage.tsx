import { NavLink, Outlet, useNavigate } from 'react-router-dom'

import { logout } from '../services/actions/authActions'
import { useAppDispatch } from '../hooks/reducerHook'

import styles from './ProfilePage.module.css'

const ProfilePage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleLogout = async () => {
        try {
            await dispatch(logout() as any)
            navigate('/login', { replace: true })
        } catch (err) {
            console.error('Logout error:', err)
        }
    }

    return (
        <div className={styles.container}>
            <nav className={styles.nav}>
                <NavLink
                    to="/profile"
                    end
                    className={({ isActive }) =>
                        isActive ? styles.linkActive : styles.link
                    }
                >
                    Профиль
                </NavLink>
                <NavLink
                    to="/profile/orders"
                    className={({ isActive }) =>
                        isActive ? styles.linkActive : styles.link
                    }
                >
                    История заказов
                </NavLink>
                <button onClick={handleLogout} className={styles.link}>
                    Выход
                </button>
                <p className={styles.description}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </nav>
            <div className={styles.content}>
                <Outlet />
            </div>
        </div>
    )
}

export default ProfilePage
