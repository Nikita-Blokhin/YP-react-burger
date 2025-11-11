import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Input,
    Button,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { login } from '../services/authActions'
import { useAppDispatch } from '../hooks/reducerHook'

import styles from './AuthPages.module.css'

const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            await dispatch(login(email, password) as any)
            navigate('/')
        } catch (err) {
            setError('Ошибка входа. Проверьте email и пароль.')
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Вход</h1>
                <Input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                    required
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                <PasswordInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                />
                {error && <p className={styles.error}>{error}</p>}
                <Button htmlType="submit" type="primary" size="large">
                    Войти
                </Button>
                <div className={styles.links}>
                    <p className={styles.text}>
                        Вы — новый пользователь?{' '}
                        <Link to="/register" className={styles.link}>
                            Зарегистрироваться
                        </Link>
                    </p>
                    <p className={styles.text}>
                        Забыли пароль?{' '}
                        <Link to="/forgot-password" className={styles.link}>
                            Восстановить пароль
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginPage
