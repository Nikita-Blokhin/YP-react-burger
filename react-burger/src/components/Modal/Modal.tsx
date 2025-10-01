import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './Modal.module.css'
import { modalContentType } from './Modal.type'


interface modalProps {
    title?: string
    children?: JSX.Element | JSX.Element[]
    modalContent: modalContentType
    setModalContent: React.Dispatch<React.SetStateAction<modalContentType>>
}

const Modal = ({
    title, children, modalContent, setModalContent
}: modalProps) => {

    const closeWindow = () => {
        setModalContent({
            isModal: null,
            content: undefined
        })
    }

    return modalContent.isModal 
        ? <>
            <div className={styles.background} />
            <div className={styles.window}>
                <div className={styles.title}>
                    <h1>{title}</h1>
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
