import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ img, tag, closeModal }) => {
  useEffect(() => {
    window.addEventListener('keydown', onCloseByEscape);
    return window.removeEventListener('keydown', onCloseByEscape);
  });

  const onCloseByEscape = e => {
    if (e.code === 'Escape') {
      closeModal();
    }
  };

  const onCloseByBackdrop = e => {
    if (e.currentTarget === e.target) {
      closeModal();
    }
  };

  return createPortal(
    <Overlay onClick={onCloseByBackdrop}>
      <ModalImg>
        <img src={img} alt={tag} />
      </ModalImg>
    </Overlay>,
    modalRoot
  );
};

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
};
