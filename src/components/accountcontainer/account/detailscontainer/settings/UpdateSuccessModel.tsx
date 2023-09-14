import React from 'react';
import Lottie from 'react-lottie';
import checkAnimation from '../../../../../utils/lotties/checklotties.json';

interface UpdateSuccessModalProps {
    showModal: boolean;
    handleShowModal: (show: boolean, navigateFlag: boolean) => void;
}
const UpdateSuccessModal: React.FC<UpdateSuccessModalProps> = ({ showModal, handleShowModal }) => {
    const defaultOptions = {
        loop: false,
        autoplay: true,
        animationData: checkAnimation,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    }
    return (
        <>
            <div className={`modal ${showModal ? 'show' : ''}`}
                role="dialog"
                tabIndex={-1}
                style={{ display: showModal ? 'block' : 'none' }}
            >
                <div
                    className='modal-dialog modal-dialog-centered modal-dialog-scrollable'
                >
                    <div className='modal-content p-3'>
                        <Lottie
                            options={defaultOptions}
                            height={200}
                            width={200}
                        />

                        <div className="modal-body m-2 py-0">
                            <h6 className='fs-21'>Password changed</h6>
                            <p className='fs-14'>Password for your account updated successfully</p>
                            <button className='btn border-0 text-white btn-dark rounded-0 w-100' onClick={() => handleShowModal(false, true)}>Continue</button>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className=" modal-backdrop fade show"></div>}
        </>
    )
}

export default UpdateSuccessModal;

