import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import styles from './Modal.module.css';

export default function Modal({ title, onModalClose, children }) {
  return (
    <div className={styles.modal}>
      <div className={styles.modalHeader}>
        {title && (
          <h3 className={`${styles.modalTitle} text text_type_main-large`}>
            {title}
          </h3>
        )}
        <CloseIcon type="primary" onClick={onModalClose} />
      </div>
      {children}
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  onModalClose: PropTypes.func.isRequired,
  children: PropTypes.element,
};
