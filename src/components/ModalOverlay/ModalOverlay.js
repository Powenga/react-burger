import { createPortal } from 'react-dom';
import { MODAL_ROOT_SELECTOR } from '../../utils/constants';
const modalRoot = document.querySelector(MODAL_ROOT_SELECTOR)

const style={
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, .6)',
};

export default function ModalOverlay({ title, children }) {
  return createPortal(
    (
      <div style={style}>
        {children}
      </div>
    ),
    modalRoot)
}