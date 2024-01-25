import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface MessageModalProps {
  show: boolean;
  handleClose: () => void;
  title: string;
  message: string;
  type: 'success' | 'error';
}

const MessageModal: React.FC<MessageModalProps> = ({ show, handleClose, title, message}) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
