import React from 'react'
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

interface EmailSentProps {
    showModal: boolean;
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
                                <p className=' Dialog-p '>
                                    Email sent {email} with further instructions.
                                </p>
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.large}
                                    variant={ButtonVariant.contained}
                                    onClick={() => handleModal({ sendMailModal: false })}
                                    classname='mt-4 mb-3'
                                >
                                    Back to Login
                                </Button>
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