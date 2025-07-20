import React from 'react';
import styles from './styles.module.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>{title}</h2>
        <div className={styles.content}>{children}</div>
        <div className={styles.actions}>
          <button onClick={onClose} className={`${styles.button} ${styles.cancel}`}>Cancelar</button>
          <button onClick={onConfirm} className={`${styles.button} ${styles.confirm}`}>Borrar</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;