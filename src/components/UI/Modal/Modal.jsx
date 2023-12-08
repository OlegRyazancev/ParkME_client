import React from 'react';
import cl from "./Modal.module.css"


const Modal = ({children, visible, setVisible, onClose}) => {
    const rootClasses = [cl.modal];
    if (visible) {
        rootClasses.push(cl.active)
    }

    const handleClose = () => {
        setVisible(false)
        if (onClose) {
            onClose();
        }
    }

    return (
        <div className={rootClasses.join(' ')}
             onClick={handleClose}>
            <div className={cl.modalContent} onClick={(e => e.stopPropagation())}>
                {children}
            </div>
        </div>

    )
}

export default Modal;