import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ESC_KEY, MODAL_ROOT_SELECTOR } from '../../utils/constants';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

const modalRoot = document.querySelector(MODAL_ROOT_SELECTOR);

export default function Modal({ title, closeModal, children }) {
  useEffect(() => {
    function handleEscPress(event) {
      if (event.key === ESC_KEY) {
        closeModal();
      }
    }
    document.addEventListener('keydown', handleEscPress);
    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [closeModal]);

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

Modal.propTypes = {
  title: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
  children: PropTypes.element,
};
