// External libraries
import React from 'react'

// CSS
import '../../../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import Modal from '../../../../ui/modal/Modal';

// Utilities
import CheckGIF from "../../../../../utils/images/Accept State-01.svg";

interface InviteSentProps {
    openInviteSent: boolean;
    handleInviteSentModal: () => void;
    email: string | undefined
}

const InviteSent: React.FC<InviteSentProps> = ({
    openInviteSent,
    handleInviteSentModal,
    email
}) => {

    return (
        <div>
            <Modal showModal={openInviteSent} classname='width-30' >
                <div className='d-flex flex-row-reverse'>
                    <Button
                        theme={ButtonTheme.dark}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleInviteSentModal()}
                        type='button'
                        classname='btn-close'
                    />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center margin-0 padding-0">
                    <img src={CheckGIF} alt="Created Successfully GIF" width={319} height={319} className='margin-0 padding-0'></img>
                    <Heading
                        title='Invite sent'
                        type={TypographyType.h2}
                        colour={TypographyColor.dark}
                        classname='margin-bottom-3'
                    />
                    <Body
                        type={BodyType.p3}
                        color={BodyColor.dark}
                        classname='text-center'>
                        {`Invite sent to "${email}"`}
                    </Body>
                </div>
            </Modal>
        </div>
    )
}

export default InviteSent;