import { useCallback, useEffect } from 'react'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

import styles from './Modal.module.css'
import { modalContentType } from '../../types/Modal'
import ModalOverlay from '../ModalOverlay/ModalOverlay'

interface modalProps {
    children?: JSX.Element | JSX.Element[]
    modalContent: modalContentType
    setModalContent: React.Dispatch<React.SetStateAction<modalContentType>>
}

const Modal = ({
    modalContent, setModalContent, children
}: modalProps) => {

    const closeWindow = useCallback(() => {
        setModalContent({
            isModal: null,
            content: undefined
        })
    }, [setModalContent])

    useEffect(() => {
        const handleEsc = (event: { key: string }) => {
            if (event.key === 'Escape') {
                closeWindow()
            }
        }

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc)
        }
    }, [closeWindow])

    return modalContent.isModal 
        ? <>
            <ModalOverlay closeWindow={closeWindow}/>
            <div className={styles.window}>
                <div className={styles.title}>
                    <h1>{modalContent.isModal === 'ingredient' 
                        && 'Детали ингредиента'}</h1>
                    <button onClick={closeWindow}>
                        <CloseIcon type={'primary'} />
                    </button>
                </div>
                { children }
            </div>
        </>
        : <></>
}

export default Modal
