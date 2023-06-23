import React, { createContext, useState } from 'react';

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const openModal = (content) => {
    setModalOpen(true);
    setModalContent(content);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  return (
    <ModalContext.Provider value={{ modalOpen, modalContent, openModal, closeModal }}>
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalProvider };
