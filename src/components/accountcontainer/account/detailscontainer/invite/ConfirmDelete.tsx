import React from 'react'

interface ConfirmDeleteProps {
    showConfirmDeleteModal: boolean;
    handleConfirmDeleteModal: (show: boolean, index: number) => void;
    handleDeleteClick: () => void;
}

const ConfirmDelete: React.FC<ConfirmDeleteProps> = ({
    showConfirmDeleteModal,
    handleConfirmDeleteModal,
    handleDeleteClick
}) => {
    return (
        <div>
            <div className={`modal ${showConfirmDeleteModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showConfirmDeleteModal ? 'block' : 'none' , borderStyle: 'inset'}}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered w-25">
                    <div className="modal-content">
                        <div className='modal-header d-flex flex-row justify-content-between w-100 pb-1'>
                            <h6 >Confirm Delete?</h6>
                            <button type="button" className="btn-close" onClick={() => handleConfirmDeleteModal(false, -1)}></button>
                        </div>
                        <div className="modal-body">

                            <p className='text-start '>Are you sure you want to delete this row?</p>

                        </div>
                        <div className="modal-footer py-1">
                            <button className=' login-btn bg-dark text-white width-fit-content-button px-4 fs-14 py-2' onClick={() => handleDeleteClick()}>Delete</button>
                            <button className=' login-btn bg-dark text-white width-fit-content-button px-4 fs-14 py-2' onClick={() => handleConfirmDeleteModal(false, -1)}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDelete;
