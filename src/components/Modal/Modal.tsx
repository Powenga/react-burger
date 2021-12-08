import { useEffect, FC } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { KEYBOARD_KEYS, MODAL_ROOT_SELECTOR } from '../../utils/constants';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import styles from './Modal.module.css';

type TModal = {
  title?: string;
  closeModal: () => void;
};

const modalRoot = document.querySelector(MODAL_ROOT_SELECTOR);

const Modal: FC<TModal> = ({ title, closeModal, children }) => {
  useEffect(() => {
    function handleEscPress(event: KeyboardEvent) {
      if (event.key === KEYBOARD_KEYS.ESCAPE) {
        closeModal();
      }
    }
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [closeModal]);

  if(modalRoot) {
    return createPortal(
      <div className={styles.modal}>
        <ModalOverlay closeModal={closeModal} />
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            {title && (
              <h3 className={`${styles.modalTitle} text text_type_main-large`}>
                {title}
              </h3>
            )}
            <CloseIcon type="primary" onClick={closeModal} />
          </div>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }

  return null;

};

export default Modal;