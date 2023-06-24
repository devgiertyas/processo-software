import React, { useContext } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { ModalContext } from '../../Contexts/ModalContext';

const ModalError = () => {
  const { modalOpen, modalContent, closeModal } = useContext(ModalContext);

  return (
    <Modal isOpen={modalOpen} toggle={closeModal} className='modal-dialog-centered' fade={false} modalClassName="primary">
      <ModalHeader toggle={closeModal}><h2 className='text-warning'>Atenção!</h2></ModalHeader>
      <ModalBody className='text-warning' >{modalContent}</ModalBody>
      <ModalFooter>
        <Button color="warning" onClick={closeModal}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ModalError;
