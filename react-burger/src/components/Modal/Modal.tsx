import { useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import ModalOverlay from '../ModalOverlay/ModalOverlay'
import { MODAL_CLOSE } from '../../services/actions'
import { useAppDispatch } from '../../hooks/reducerHook'

import styles from './Modal.module.css'

interface ModalProps {
    children?: JSX.Element | JSX.Element[]
    title?: string
}

const Modal = ({
    children, title
}: ModalProps) => {
    
    const dispatch = useAppDispatch()
    const modalRoot = document.getElementById('modals')!

    const closeWindow = useCallback(() => {
        dispatch({type: MODAL_CLOSE})
    }, [dispatch])

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

    return ReactDOM.createPortal((<>
        <ModalOverlay closeWindow={closeWindow}/>
        <div className={styles.window}>
            <div className={styles.title}>
                <h2>{title}</h2>
                <button onClick={closeWindow}>
                    <CloseIcon type={'primary'} />
                </button>
            </div>
            { children }
        </div>
    </>), modalRoot)
}

export default Modal
