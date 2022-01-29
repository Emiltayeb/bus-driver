import { useModalContext } from 'context/modal.context';
import React from 'react';
import ReactDOM from 'react-dom';
import classes from './modal.module.scss';
import { ReactComponent as CloseIcon } from 'assets/buttons-icons/Close-Icon.svg';
import AnimatedPage from 'components/animatePages';

const Modal: React.FC<{ title?: string }> = ({ children, title }) => {
 const { closeModal } = useModalContext();

 return ReactDOM.createPortal(
  <AnimatedPage className={classes.Container} key="modal-portal">
   {/* overlay */}
   <div className={classes.OverLay} onClick={closeModal}></div>
   {/* content */}
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
  </AnimatedPage>,

  document.getElementById('modal')!
 );
};

export default Modal;
