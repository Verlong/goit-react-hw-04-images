import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from '../../styles/styles.module.css';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ url, tags, onClose }) => {
  useEffect(() => {
    const clickEsc = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', clickEsc);

    return () => {
      window.removeEventListener('keydown', clickEsc);
    };
  }, [onClose]);

  const clickBackdrop = event => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={clickBackdrop}>
      <div className={css.modal}>
        <img src={url} alt={tags} />
      </div>
    </div>,
    modalRoot
  );
};

Modal.propTypes = {
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
