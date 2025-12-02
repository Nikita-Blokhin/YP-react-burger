import { useState, type FormEvent, useEffect } from 'react'
import {
    Input,
    Button,
} from '@ya.praktikum/react-developer-burger-ui-components'

import { updateUser } from '../services/actions/authActions'
import { useAppDispatch, useAppSelector } from '../hooks/reducerHook'

import styles from './ProfileInfoPage.module.css'

const ProfileInfoPage = () => {
    const dispatch = useAppDispatch()
    const user = useAppSelector((state) => state.auth.user)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isEditing, setIsEditing] = useState(false)
    const [originalValues, setOriginalValues] = useState({
        name: '',
        email: '',
    })

    useEffect(() => {
        if (user) {
            setName(user.name)
            setEmail(user.email)
            setOriginalValues({ name: user.name, email: user.email })
        }
        setIsEditing(false)
    }, [user])

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        try {
            dispatch(updateUser(email, name, password || undefined) as any)
            setIsEditing(false)
            setPassword('')
        } catch (err) {
            console.error('Update error:', err)
        }
    }

    const handleCancel = () => {
        setName(originalValues.name)
        setEmail(originalValues.email)
        setPassword('')
        setIsEditing(false)
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Имя"
                value={name}
                onChange={(e) => {
                    setName(e.target.value)
                    setIsEditing(true)
                }}
                name="name"
                icon="EditIcon"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <Input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value)
                    setIsEditing(true)
                }}
                name="email"
                icon="EditIcon"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            <Input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value)
                    setIsEditing(true)
                }}
                name="password"
                icon="EditIcon"
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
            />
            {isEditing && (
                <div className={styles.buttons}>
                    <Button
                        htmlType="button"
                        type="secondary"
                        onClick={handleCancel}
                    >
                        Отмена
                    </Button>
                    <Button htmlType="submit" type="primary">
                        Сохранить
                    </Button>
                </div>
            )}
        </form>
    )
}

export default ProfileInfoPage
