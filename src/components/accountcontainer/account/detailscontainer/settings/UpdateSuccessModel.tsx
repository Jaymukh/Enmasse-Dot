import React from 'react';
import '../../../../../styles/main.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import Body, { BodyType, BodyColor } from '../../../../ui/typography/Body';
import CheckGIF from "../../../../../utils/images/CheckMarkGIF.gif";
import Modal from '../../../../ui/modal/Modal';

interface UpdateSuccessModalProps {
    showModal: boolean;
    handleShowModal: (show: boolean, navigateFlag: boolean) => void;
}
const UpdateSuccessModal: React.FC<UpdateSuccessModalProps> = ({ showModal, handleShowModal }) => {
    return (
        <>
            <Modal showModal={showModal} classname='width-30' >
                <div className='d-flex flex-row justify-content-end'>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleShowModal(false, false)}
                        classname='btn-close'
                    />
                </div>
                <div className='d-flex justify-content-center'>
                    <img src={CheckGIF} alt="Created Successfully GIF" height={200} width={200} ></img>
                </div>
                <div className="modal-body m-2 py-0">
                    <h6 className='fs-21'>Password changed</h6>
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

