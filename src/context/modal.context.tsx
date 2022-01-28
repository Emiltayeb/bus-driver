import React from 'react';

interface Modal {
 modalOpen: boolean;
 closeModal: () => void;
 openModal: () => void;
}
const ModalContext = React.createContext<Modal>({
 modalOpen: false,
 closeModal: () => {},
 openModal: () => {}
});

export const ModalContextProvider: React.FC = function ({ children }) {
 const [modalOpen, setIsModalOpen] = React.useState(false);

 const closeModal = () => setIsModalOpen(false);
 const openModal = () => setIsModalOpen(true);
 return (
  <ModalContext.Provider
   value={{
    modalOpen,
    closeModal,
    openModal
   }}
  >
   {children}
  </ModalContext.Provider>
 );
};

export const useModalContext = () => React.useContext(ModalContext);
export default ModalContextProvider;
