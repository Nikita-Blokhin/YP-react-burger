import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
    Input,
    Button,
    PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { register } from '../services/authActions'
import { useAppDispatch } from '../hooks/reducerHook'

import styles from './AuthPages.module.css'

const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        setError('')
        try {
            await dispatch(register(email, password, name) as any)
            navigate('/')
        } catch (err) {
            setError('Ошибка регистрации. Попробуйте другой email.')
        }
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <h1 className={styles.title}>Регистрация</h1>
                <Input
                    type="text"
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    required
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                />
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
                    Зарегистрироваться
                </Button>
                <div className={styles.links}>
                    <p className={styles.text}>
                        Уже зарегистрированы?{' '}
                        <Link to="/login" className={styles.link}>
                            Войти
                        </Link>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default RegisterPage
