import React from 'react';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Input } from '../ui/input/Input';

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
                                
                                <Input
                                    type="email"
                                    placeholder="Enter your email id here"
                                    value={email}
                                    name='email_id'
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
                                    theme={ButtonTheme.secondary}
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