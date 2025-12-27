import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';

const modalRoot = document.querySelector('#root') || document.body;

const Modal = ({ onClose, children }) => {
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        {/* Kapatma Butonu (X) */}
        <button type="button" className={styles.closeBtn} onClick={onClose}>
          ✕ 
        </button>
        
        {children}
      </div>
    </div>,
    modalRoot
  );
};

export default Modal;