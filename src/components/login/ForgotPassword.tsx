import React from 'react';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

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
                            <div className='d-flex flex-row justify-content-between align-items-center'>
                                <h5 >Forgot Password</h5>
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.medium}
                                    variant={ButtonVariant.transparent}
                                    onClick={() => handleModal({ passwordModal: false })}
                                    type='button'
                                    classname='btn-close m-0 w-auto p-2'
                                />
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
                                <Button
                                    theme={ButtonTheme.primary}
                                    classname='mb-2 mt-4'
                                    size={ButtonSize.large}
                                    variant={ButtonVariant.contained}
                                    onClick={handleSendEmail}
                                >
                                    Send Email
                                </Button>
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.large}
                                    variant={ButtonVariant.transparent}
                                    onClick={() => handleModal({ passwordModal: false })}
                                    classname='underline-text'
                                >
                                    Back to Login
                                </Button>
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