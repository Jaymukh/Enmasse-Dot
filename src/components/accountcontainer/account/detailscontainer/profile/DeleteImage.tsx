import React from 'react'
import '../../../../../styles/main.css';
import { MdCancel } from 'react-icons/md';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import Modal from '../../../../ui/modal/Modal';

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
            <Modal showModal={showDeleteImageModal} classname='width-18-75' >
                <div className='d-flex flex-row justify-content-end w-100 pb-1'>
                    <Button type="button" theme={ButtonTheme.secondary} variant={ButtonVariant.transparent} classname="btn-close" onClick={() => handleDeleteModel(false)}></Button>
                </div>
                <div d-flex justify-content-center>
                    <MdCancel className='text-center fs-60 color-orange' />
                </div>
                <Heading
                    title='Are you sure?'
                    type={TypographyType.h5}
                    colour={TypographyColor.dark}
                />
                <Body
                    type={BodyType.p3}
                    color={BodyColor.dark}
                    classname='text-center'>Do you really want to delete this record? This process cannot be undone.</Body>
                <Button
                    theme={ButtonTheme.warning}
                    size={ButtonSize.large}
                    variant={ButtonVariant.bordered}
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
                    classname='text-decoration-underline'
                >
                    Cancel
                </Button>
            </Modal>
        </div>
    )
}

export default DeleteImage;
