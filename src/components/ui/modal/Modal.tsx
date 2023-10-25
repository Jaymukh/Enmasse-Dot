import React from 'react'
import styles from "./Modal.module.css";

interface ModalProps {
    children?: React.ReactNode;
    showModal: boolean;
    classname?: string;
}

const Modal = ({ showModal, children, classname }: ModalProps) => {
    return (
        <div>
            <div className={`modal ${showModal ? 'show' : ''} ${classname} modal-height`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered w-auto m-auto">
                    <div className={`modal-content `}>
                        <div className="modal-body d-flex flex-column justify-content-center w-auto m-3 ">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    )
}

export default Modal;


