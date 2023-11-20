import React from 'react'
import '../../../../../styles/main.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Modal from '../../../../ui/modal/Modal';
import CheckGIF from "../../../../../utils/images/CheckMarkGIF.gif";

interface InviteSentProps {
    openInviteSent: boolean;
    setOpenInviteSent: (openInviteSent: boolean) => void;
    email: string | undefined
}

const InviteSent: React.FC<InviteSentProps> = ({
    openInviteSent,
    setOpenInviteSent,
    email
}) => {

    const handleInviteSentModal = () => {
        setOpenInviteSent(false);
    }

    return (
        <div>
            <Modal showModal={openInviteSent} classname='width-30' >
                <div className='d-flex flex-row-reverse'>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.default}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleInviteSentModal()}
                        type='button'
                        classname='btn-close mx-3 my-auto'
                    />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    <img src={CheckGIF} alt="Created Successfully GIF" width={319} height={319}></img>
                    <Heading
                        title='Invite sent'
                        type={TypographyType.h2}
                        colour={TypographyColor.dark}
                        classname='mb-3'
                    />
                    <p className=' fs-12 '>
                        Invite sent to "{email}".
                    </p>
                </div>
            </Modal>
        </div>
    )
}

export default InviteSent;