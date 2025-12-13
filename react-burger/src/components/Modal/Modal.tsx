import { useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { MODAL_CLOSE } from '../../services/actions/modalActions'
import { useAppDispatch, useAppSelector } from '../../hooks/reducerHook'

import styles from './Modal.module.css'

interface IModalProps {
    children?: JSX.Element | JSX.Element[]
    title?: string
    isPostOrder?: boolean
}

const Modal = ({ children, title, isPostOrder = false }: IModalProps) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const titleState = useAppSelector((state) => state.modal.title)

    const modalRoot = document.getElementById('modals')!

    const closeWindow = useCallback(() => {
        dispatch({ type: MODAL_CLOSE })
        !isPostOrder && navigate(-1)
    }, [dispatch, isPostOrder, navigate])

    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                closeWindow()
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
    }, [closeWindow])

    return ReactDOM.createPortal(
        <>
            <ModalOverlay closeWindow={closeWindow} />
            <div className={styles.window} data-testid="modal">
                <div className={styles.title}>
                    <h2>{titleState ? titleState : title}</h2>
                    <button
                        onClick={closeWindow}
                        data-testid="modal-close-button"
                    >
                        <CloseIcon type={'primary'} />
                    </button>
                </div>
                {children}
            </div>
        </>,
        modalRoot
    )
}

export default Modal
