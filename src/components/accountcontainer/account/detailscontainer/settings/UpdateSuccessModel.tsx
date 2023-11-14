import React from 'react';
import '../../../../../styles/main.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
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
                <div className='d-flex justify-content-center'>
                    <img src={CheckGIF} alt="Created Successfully GIF" height={200} width={200} ></img>
                </div>

                <div className="modal-body m-2 py-0">
                    <h6 className='fs-21'>Password changed</h6>
                    <p className='fs-14'>Password for your account updated successfully</p>
                    {/* <button className='btn border-0 text-white btn-dark rounded-0 w-100' onClick={() => handleShowModal(false, true)}>Continue</button> */}
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.contained}
                        onClick={() => handleShowModal(false, true)}
                        classname='my-4'
                        datatestid="ContinueBtnId"
                    >
                        Continue
                    </Button>
                </div>
            </Modal>
        </>
    )
}

export default UpdateSuccessModal;

