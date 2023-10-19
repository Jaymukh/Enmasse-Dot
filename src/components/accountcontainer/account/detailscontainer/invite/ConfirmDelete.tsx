import React from 'react'
import '../../../../../App.css';
import '../../../../../styles/main.css';
import { MdCancel } from 'react-icons/md';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Modal from '../../../../ui/modal/Modal';

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
            <Modal showModal={showConfirmDeleteModal} classname='width-18-75' >
                <div className='d-flex flex-row justify-content-end w-100 pb-1'>
                    <Button type="button" theme={ButtonTheme.secondary} variant={ButtonVariant.transparent} classname="btn-close" onClick={() => closeConfirmDeleteModal()}></Button>
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
                    onClick={() => closeConfirmDeleteModal()}
                >
                    Cancel
                </Button>
            </Modal>
        </div>
    )
}

export default ConfirmDelete;
