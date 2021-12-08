import { FC, SyntheticEvent, useRef } from 'react';
import { TStyle } from '../../utils/types';

const style: TStyle = {
  position: 'absolute',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'rgba(0, 0, 0, .6)',
};

type TModalOverlay = {
  closeModal: () => void;
};

const ModalOverlay: FC<TModalOverlay> = ({ closeModal }) => {
  const overlayRef = useRef(null);

  function handleClick(event: SyntheticEvent) {
    if (event.target === overlayRef.current) {
      closeModal();
    }
  }

  return <div ref={overlayRef} style={style} onClickCapture={handleClick} />;
};

export default ModalOverlay;
