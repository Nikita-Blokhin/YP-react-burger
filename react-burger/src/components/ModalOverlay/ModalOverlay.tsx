import styles from './ModalOverlay.module.css'

interface ModalOverlayProps {
    closeWindow: () => void
}

const ModalOverlay = ({closeWindow}: ModalOverlayProps) => {
    return (
        <div className={styles.background} onClick={closeWindow}/>
    )
}

export default ModalOverlay
