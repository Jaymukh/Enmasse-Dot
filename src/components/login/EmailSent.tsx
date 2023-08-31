import React from 'react'

interface EmailSentProps {
    // handleLoggedIn: (flag: boolean) => void;
    showEmailSentModal: boolean;
    forgotPasswordEmail:string;
    closeEmailSentModal: () => void;
}

const EmailSent: React.FC<EmailSentProps> = ({
    showEmailSentModal,
    forgotPasswordEmail,
    closeEmailSentModal
}) => {
    return (
        <div>
            <div className={`modal ${showEmailSentModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showEmailSentModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body d-flex flex-column justify-content-center w-auto m-3">
                            <div className='d-flex flex-row-reverse'>
                                <button type="button" className="btn-close" onClick={closeEmailSentModal}></button>
                            </div>
                            <div className=" d-flex flex-column justify-content-center my-2">
                                <h5 className='text-start'>Email sent</h5>
                                <p className=' Dialog-p '>Email sent to  {forgotPasswordEmail}  with further instructions.</p>
                                <button className='mb-2 mt-4 inputBoxHeight login-btn bg-dark text-white fs-6' onClick={closeEmailSentModal}>Back to Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default EmailSent;
