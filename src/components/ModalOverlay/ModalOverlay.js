import { useRef } from 'react';
import PropTypes from 'prop-types';

const style = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, .6)',
};

export default function ModalOverlay({ closeModal }) {
  const overlayRef = useRef(null);

  function handleClick(event) {
    if (event.target === overlayRef.current) {
      closeModal();
    }
  }

  return <div ref={overlayRef} style={style} onClickCapture={handleClick} />;
}

ModalOverlay.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
