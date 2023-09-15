import React from 'react'

interface EmailSentProps {
    showModal : boolean;
    handleModal: (value: any) => void;
    email: string;
}

const EmailSent: React.FC<EmailSentProps> = ({
    showModal,
    handleModal,
    email
}) => {
    return (
        <div>
            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body d-flex flex-column justify-content-center w-auto m-3">
                            <div className='d-flex flex-row-reverse'>
                                <button type="button" className="btn-close" onClick={() => handleModal({ sendMailModal: false })}></button>
                            </div>
                            <div className=" d-flex flex-column justify-content-center my-2">
                                <h5 className='text-start'>Email sent</h5>
                                <p className=' Dialog-p '>Email sent to
                                    {email}
                                    with further instructions.</p>
                                <button className='mb-2 mt-4 inputBoxHeight login-btn bg-dark text-white fs-6' onClick={() => handleModal({ sendMailModal: false })}>Back to Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div>
    )
}

export default EmailSent;