import { useModalContext } from 'context/modal.context';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import ReactDOM from 'react-dom';
import classes from './modal.module.scss';
import { ReactComponent as CloseIcon } from 'assets/buttons-icons/Close-Icon.svg';

const Modal: React.FC<{ title?: string }> = ({ children, title }) => {
 const { closeModal, modalOpen } = useModalContext();

 return ReactDOM.createPortal(
  <AnimatePresence exitBeforeEnter initial={false}>
   {modalOpen && (
    <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     exit={{ opacity: 0 }}
     className={classes.Container}
     key="modal-portal"
    >
     {/* overlay */}
     {/* content */}
     <div className={classes.OverLay} onClick={closeModal}></div>

     <div className={classes.Modal}>
      {/* title + close buton */}
      <div className={classes.TopBar}>
       <span className={classes.Title}>{title}</span>
       <button className={classes.CloseButton} onClick={closeModal}>
        <CloseIcon />
       </button>
      </div>

      <div className={classes.Content}>{children}</div>
     </div>
    </motion.div>
   )}
  </AnimatePresence>,

  document.getElementById('modal')!
 );
};

export default Modal;
