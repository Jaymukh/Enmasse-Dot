import React from 'react'
import '../../../../../App.css';
import { MdCancel } from 'react-icons/md';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';

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
        <div>
            <div className={`modal ${showConfirmDeleteModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showConfirmDeleteModal ? 'block' : 'none', borderStyle: 'inset' }}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered w-25">
                    <div className="modal-content">
                        <div className="modal-body d-flex flex-column justify-content-center align-items-center text-center m-auto">
                            <div className='d-flex flex-row justify-content-end w-100 pb-1'>
                                <Button type="button" theme={ButtonTheme.secondary} variant={ButtonVariant.transparent} classname="btn-close" onClick={() => closeConfirmDeleteModal()}></Button>
                            </div>
                            <MdCancel className='text-center fontSizeXL color-orange' />
                            <h5 >Are you sure?</h5>
                            <p className='text-center fontSizeS'>Do you really want to delete this record? This process cannot be undone.</p>
                            <Button
                                theme={ButtonTheme.warning}
                                size={ButtonSize.large}
                                variant={ButtonVariant.contained}
                                onClick={() => handleDeleteClick()}
                                classname='my-2'
                            >
                                Delete
                            </Button>
                            <Button
                                theme={ButtonTheme.secondary}
                                size={ButtonSize.large}
                                variant={ButtonVariant.contained}
                                onClick={() => closeConfirmDeleteModal()}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showConfirmDeleteModal && <div className=" modal-backdrop fade show"></div>}
        </div>
    )
}

export default ConfirmDelete;
