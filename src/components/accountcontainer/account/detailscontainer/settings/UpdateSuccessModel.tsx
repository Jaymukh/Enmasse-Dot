// External libraries
import React from 'react';

// CSS
import '../../../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../../../../ui/typography/Body';
import Modal from '../../../../ui/modal/Modal';

// Utilities
import CheckGIF from "../../../../../utils/images/Accept State-01.svg";


interface UpdateSuccessModalProps {
    showModal: boolean;
    handleShowModal: (show: boolean, navigateFlag: boolean) => void;
}
const UpdateSuccessModal: React.FC<UpdateSuccessModalProps> = ({ showModal, handleShowModal }) => {
    return (
        <>
            <Modal showModal={showModal} classname='width-30' >
                <div className='d-flex justify-content-center'>
                    <img src={CheckGIF} alt="Created Successfully GIF" height={200} width={200} ></img>
                </div>
                <div className="modal-body m-2 py-0">
                    <Heading
                        title='Password changed!'
                        colour={TypographyColor.dark}
                        type={TypographyType.h2}
                    />
                    <Body
                        type={BodyType.p2}
                        color={BodyColor.dark}
                        classname=''>
                        Password for your account updated successfully
                    </Body>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleShowModal(false, true)}
                        classname='mt-4'
                    >
                        Continue
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default UpdateSuccessModal;

