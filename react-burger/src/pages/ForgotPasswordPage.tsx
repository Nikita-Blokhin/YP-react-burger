import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { forgotPassword } from '../services/authActions'
import { useAppDispatch } from '../hooks/reducerHook'

import styles from './AuthPages.module.css'

const ForgotPasswordPage = () => {
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            await dispatch(forgotPassword(email) as any)
            navigate('/reset-password', {
                state: { fromForgotPassword: true },
            })
        } catch (err) {
            setError('Ошибка отправки кода. Проверьте email.')
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Восстановление пароля</h1>
                <Input
                    type="email"
                    placeholder="Укажите e-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                {error && <p className={styles.error}>{error}</p>}
                <Button htmlType="submit" type="primary" size="large">
                    Восстановить
                </Button>
                <div className={styles.links}>
                    <p className={styles.text}>
                        Вспомнили пароль?{' '}
                        <Link to="/login" className={styles.link}>
                            Войти
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default ForgotPasswordPage
