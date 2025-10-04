import { useCallback, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './Modal.module.css'
import { ModalContentType } from '../../types/Modal'
import ModalOverlay from '../ModalOverlay/ModalOverlay'

interface ModalProps {
    children?: JSX.Element | JSX.Element[]
    modalContent: ModalContentType
    setModalContent: React.Dispatch<React.SetStateAction<ModalContentType>>
}

const Modal = ({
    modalContent, setModalContent, children
}: ModalProps) => {

    const modalRoot = document.getElementById('modals')!

    const closeWindow = useCallback(() => {
        setModalContent({
            isModal: null,
            content: undefined
        })
    }, [setModalContent])

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

    return ReactDOM.createPortal((modalContent.isModal 
        && <>
            <ModalOverlay closeWindow={closeWindow}/>
            <div className={styles.window}>
                <div className={styles.title}>
                    <h2>{modalContent.isModal === 'ingredient' 
                        && 'Детали ингредиента'}</h2>
                    <button onClick={closeWindow}>
                        <CloseIcon type={'primary'} />
                    </button>
                </div>
                { children }
            </div>
        </>
    ), modalRoot)
}

export default Modal
