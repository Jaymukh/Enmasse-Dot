import React from 'react'
import '../../styles/main.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Modal from '../ui/modal/Modal';

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
            <Modal showModal={showModal} classname='width-18-75' >
                <div className='d-flex flex-row-reverse'>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.medium}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleModal({ sendMailModal: false })}
                        type='button'
                        classname='btn-close mx-3 w-auto my-auto'
                    />
                </div>
                <div className=" d-flex flex-column justify-content-center my-2">
                    <Heading
                        title='Email sent'
                        type={TypographyType.h4}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
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
            </Modal>
        </div>
    )
}

export default EmailSent;