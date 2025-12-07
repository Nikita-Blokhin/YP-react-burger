import styles from './ModalOverlay.module.css'

interface IModalOverlayProps {
    closeWindow: () => void
}

const ModalOverlay = ({ closeWindow }: IModalOverlayProps) => {
    return <div className={styles.background} onClick={closeWindow} />
}

export default ModalOverlay
