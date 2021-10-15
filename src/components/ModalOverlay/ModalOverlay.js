import { useEffect, useRef } from 'react';
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

export default function ModalOverlay({ title, onOverlayClick, children }) {

  const overlayRef = useRef(null);

  function handleClick(event) {
    if(event.target === overlayRef.current) {
      onOverlayClick();
    }
  }

  return createPortal(
    (
      <div ref={overlayRef} style={style} onClickCapture={handleClick}>
        {children}
      </div>
    ),
    modalRoot)
}