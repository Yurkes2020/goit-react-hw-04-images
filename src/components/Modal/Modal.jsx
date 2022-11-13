import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalImg } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  static propTypes = {
    closeModal: PropTypes.func.isRequired,
    img: PropTypes.string.isRequired,
  };
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEscape);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEscape);
  }

  onCloseByEscape = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  onCloseByBackdrop = e => {
    if (e.currentTarget === e.target) {
      this.props.closeModal();
    }
  };
  render() {
    return createPortal(
      <Overlay onClick={this.onCloseByBackdrop}>
        <ModalImg>
          <img src={this.props.img} alt={this.props.tag} />
        </ModalImg>
      </Overlay>,
      modalRoot
    );
  }
}
