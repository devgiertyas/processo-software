import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ModalContext } from '../../Contexts/ModalContext';

const ModalError = () => {
  const { modalOpen, modalContent, closeModal } = useContext(ModalContext);

  return (
    <Modal isOpen={modalOpen} toggle={closeModal} className='modal-dialog-centered' fade={false} modalClassName="primary">
      <ModalHeader toggle={closeModal}>Atenção!</ModalHeader>
      <ModalBody>{modalContent}</ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={closeModal}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalError;
