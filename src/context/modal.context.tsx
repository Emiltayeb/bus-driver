import Modal from 'components/modal';
import React from 'react';
import { AnimatePresence } from 'framer-motion';

type OpenModal = { title?: string; component?: any; open?: boolean; onOpen?: any; onClose?: any };
interface ModalContextInterface {
 closeModal: () => void;
 openModal: ({ title, component, open, onOpen, onClose }: OpenModal) => void;
}
const ModalContext = React.createContext<ModalContextInterface>({
 closeModal: () => {},
 openModal: () => {}
});

export const ModalContextProvider: React.FC = function ({ children }) {
 const [modalData, setModalState] = React.useState<OpenModal>({
  title: '',
  component: null,
  open: false,
  onOpen: null,
  onClose: null
 });

 const closeModal = () => {
  setModalState({ title: '', component: null, open: false });
  modalData.onClose?.();
 };

 const openModal = ({ title, component, onOpen, onClose }: OpenModal) => {
  setModalState({ title, component, open: true, onOpen, onClose });
  onOpen?.();
 };

 return (
  <ModalContext.Provider
   value={{
    closeModal,
    openModal
   }}
  >
   {modalData.open && (
    <AnimatePresence exitBeforeEnter initial={false}>
     <Modal title={modalData.title}>{modalData.component}</Modal>
    </AnimatePresence>
   )}

   {children}
  </ModalContext.Provider>
 );
};

export const useModalContext = () => React.useContext(ModalContext);
export default ModalContextProvider;
