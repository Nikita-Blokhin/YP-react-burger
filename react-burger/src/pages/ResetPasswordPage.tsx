import { useState, type FormEvent, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import {
    Input,
    Button,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { resetPassword } from '../services/actions/authActions'
import { useAppDispatch } from '../hooks/reducerHook'

import styles from './AuthPages.module.css'

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        if (!location.state?.fromForgotPassword) {
            navigate('/forgot-password')
        }
    }, [location, navigate])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            await dispatch(resetPassword(password, code) as any)
            navigate('/login')
        } catch (err) {
            setError('Ошибка сброса пароля. Проверьте код из письма.')
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Восстановление пароля</h1>
                <PasswordInput
                    placeholder="Введите новый пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    name="password"
                    required
                />
                <Input
                    type="text"
                    placeholder="Введите код из письма"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    name="code"
                    required
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
                {error && <p className={styles.error}>{error}</p>}
                <Button htmlType="submit" type="primary" size="large">
                    Сохранить
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

export default ResetPasswordPage
