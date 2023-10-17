import React from 'react'
import '../../../../../App.css';
import { MdCancel } from 'react-icons/md';

interface ConfirmDeleteProps {
    showConfirmDeleteModal: boolean;
    closeConfirmDeleteModal: () => void;
    handleDeleteClick: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
    showConfirmDeleteModal,
    closeConfirmDeleteModal,
    handleDeleteClick
}) => {
    return (
        <div data-testid="ConfirmDelete">
            <div className={`modal ${showConfirmDeleteModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showConfirmDeleteModal ? 'block' : 'none', borderStyle: 'inset' }}>
                <div className={`modal ${showConfirmDeleteModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showConfirmDeleteModal ? 'block' : 'none', borderStyle: 'inset' }}>
                    <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered w-25">
                        <div className="modal-content">
                            <div className="modal-body d-flex flex-column justify-content-center align-items-center text-center m-auto">
                                <div className='d-flex flex-row justify-content-end w-100 pb-1'>
                                    <button type="button" className="btn-close" onClick={() => closeConfirmDeleteModal()}></button>
                                </div>
                                <MdCancel className='text-center fontSizeXL color-orange' />
                                <h5 >Are you sure?</h5>
                                <p className='text-center fontSizeS'>Do you really want to delete this record? This process cannot be undone.</p>
                                <button className=' login-btn bg-orange text-white  px-4 fs-14 py-2 my-2 w-100' onClick={() => handleDeleteClick()}>Delete</button>
                                <button className=' login-btn bg-white text-black px-4 fs-14 py-2 w-100' onClick={() => closeConfirmDeleteModal()}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;
