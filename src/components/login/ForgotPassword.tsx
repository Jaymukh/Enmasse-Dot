import React from 'react';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Input } from '../ui/input/Input';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import Modal from '../ui/modal/Modal';
import { useUserService } from '../../services';
import { useSetRecoilState } from "recoil";
import { spinnerState } from "../../states";

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
    const userService = useUserService();
    const setSpinner = useSetRecoilState(spinnerState);



    return (
        <div>
            <Modal showModal={showModal}>
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <Heading
                        title='Forgot Password'
                        type={TypographyType.h4}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.medium}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleModal({ passwordModal: false })}
                        type='button'
                        classname='btn-close m-0 w-auto p-2'
                    />
                </div>
                <Body
                    type={BodyType.p4}
                    color={BodyColor.dark}
                    classname='text-start'
                >
                    Enter your email, we will send you instructions.
                </Body>
                <div className=" d-flex flex-column justify-content-start my-2" >
                    <Heading
                        title='Email'
                        type={TypographyType.h4}
                        colour={TypographyColor.dark}
                        classname='text-start'
                    />
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
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleModal({ passwordModal: false })}
                        classname='underline-text'
                    >
                        Back to Login
                    </Button>
                </div>
            </Modal>
        </div >
    )
}

export default ForgotPassword;