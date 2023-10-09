import React from 'react'
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
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
            <div className={`modal ${openInviteSent ? 'show' : ''}`} tabIndex={-1} role="dialog" style={{ display: openInviteSent ? 'block' : 'none' }}>
                <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-body d-flex flex-column justify-content-center w-auto m-2">
                            <div className='d-flex flex-row-reverse'>
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.medium}
                                    variant={ButtonVariant.transparent}
                                    onClick={() => handleInviteSentModal()}
                                    type='button'
                                    classname='btn-close mx-3 w-auto my-auto'
                                />
                            </div>
                            <div className="d-flex flex-column justify-content-center my-2">
                                <img src={CheckGIF} alt="Created Successfully GIF" width={319} height={319}></img>
                                <Heading
                                    title='Invite sent'
                                    type={TypographyType.h2}
                                    colour={TypographyColor.dark}
                                    classname='mb-3'
                                />
                                <p className=' fs-12 '>
                                    Invite sent to "{email}" with login and password.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {openInviteSent && <div className="modal-backdrop fade show"></div>}
        </div>
    )
}

export default InviteSent;