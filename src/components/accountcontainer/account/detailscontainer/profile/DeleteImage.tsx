import React from 'react'
import '../../../../../App.css';
import { MdCancel } from 'react-icons/md';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';

interface DeleteImageProps {
    showDeleteImageModal: boolean;
    handleDeleteModel: (showDeleteImageModal: boolean) => void;
    handleDeleteClick: () => void;
}

const DeleteImage: React.FC<DeleteImageProps> = ({
    showDeleteImageModal,
    handleDeleteModel,
    handleDeleteClick
}) => {
    return (
        <div>
            <div className={`modal ${showDeleteImageModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showDeleteImageModal ? 'block' : 'none', borderStyle: 'inset' }}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered w-25">
                    <div className="modal-content">
                        <div className="modal-body d-flex flex-column justify-content-center align-items-center text-center m-auto">
                            <div className='d-flex flex-row justify-content-end w-100 pb-1'>
                                <Button type="button" theme={ButtonTheme.secondary} variant={ButtonVariant.transparent} classname="btn-close" onClick={() => handleDeleteModel(false)}></Button>
                            </div>
                            <MdCancel className='text-center fontSizeXL color-orange' />
                            <Heading
                                title='Are you sure?'
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                            />
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
                                onClick={() => handleDeleteModel(false)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {showDeleteImageModal && <div className=" modal-backdrop fade show"></div>}
        </div>
    )
}

export default DeleteImage;
