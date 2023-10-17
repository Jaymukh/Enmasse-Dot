import React, { useState, useEffect } from 'react';

interface ForgotPasswordProps {
    showModal: boolean;
    handleModal: (value: any) => void;
    email: string;
    handleEmailChange: (value: string) => void;
    handleSendEmail: () => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (
    {
        showModal,
        handleModal,
        email,
        handleEmailChange,
        handleSendEmail
    }) => {

    return (
        <div>
            <div className={`modal ${showModal ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: showModal ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body d-flex flex-column justify-content-center w-auto m-3">
                            <div className='d-flex flex-row justify-content-between'>
                                <h5 >Forgot Password</h5>
                                <button type="button" className="btn-close" onClick={() => handleModal({ passwordModal: false })}></button>
                            </div>
                            <p className='Dialog-p'>Enter your email, we will send you instructions.</p>
                            <div className=" d-flex flex-column justify-content-start my-2" >
                                <h5 className='d-flex justify-content-start'>Email</h5>
                                <input
                                    type="email"
                                    name='email_id'
                                    value={email}
                                    className='my-1 px-2 inputBoxHeight'
                                    placeholder='Enter your email id here'
                                    onChange={(e) => handleEmailChange(e.target.value)}
                                />
                                {/* {forgotPasswordEmailError && <p className='text-danger text-start'>{forgotPasswordEmailError}</p>} */}

                                <button
                                    className={`mb-2 mt-4 inputBoxHeight login-btn text-white fs-6 ${email ? 'bg-dark' : 'bg-secondary'}`}
                                    // disabled={email.length > 0 ? true : false}
                                    onClick={handleSendEmail}
                                >Send Email
                                </button>
                                <button className='bg-transparent underline-text border-0' onClick={() => handleModal({ passwordModal: false })}>Back to Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showModal && <div className="modal-backdrop fade show"></div>}
        </div >
    )
}

export default ForgotPassword;