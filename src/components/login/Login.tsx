import '../../App.css';
import React, { useState } from 'react';
import globe from '../../utils/images/globe.png';
import ForgotPassword from './ForgotPassword';
import EmailSent from './EmailSent';
import TermsAndConditions from './TermsAndConditions';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useUserService } from '../../services';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useSetRecoilState } from "recoil";
import { spinnerState } from "../../states";
import { toast } from 'react-toastify';

interface IFormValues {
    email_id: string;
    password: string;
}

interface IModal {
    passwordModal: boolean;
    sendMailModal: boolean;
    tncModal: boolean;
}

export default function Login() {
    const userService = useUserService();
    const setSpinner = useSetRecoilState(spinnerState);
    const [email, setEmail] = useState('');
    const [showModal, setShowModal] = useState<IModal>({
        passwordModal: false,
        sendMailModal: false,
        tncModal: false
    })

    const validationSchema = Yup.object().shape({
        email_id: Yup.string()
            .required('Email is required')
            .email("Email is not valid")
            .matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Email is not valid'),
        password: Yup.string()
            .required('Password is required')
    });

    const { handleSubmit, register, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { errors, isSubmitting, isValid } = formState;

    const onSubmit = (values: IFormValues) => {
        if (Object.values(errors).length > 0) {
            return;
        }
        userService.login(values);
    }

    const handleModal = (value: any) => {
        setShowModal({ ...showModal, ...value });
    }

    const handleEmailChange = (value: string) => {
        setEmail(value);
    }

    const handleSendEmail = () => {
        setSpinner(true);
        userService.forgotPassword({"email_id": email})
            .then((response: any) => {
                if (response) {
                    toast.success(response.message, {
                        position: toast.POSITION.BOTTOM_CENTER,
                      });
                    setSpinner(false);
                }
            })
            .catch((error: any) => {
                setSpinner(false);
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
        setEmail('');
        handleModal({ passwordModal: false });
    }

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }
    
    return (
        <div>
            <div className='row mx-0' style={{ height: '100vh', width: '100vw' }} >
                <div className='col-md-6 col-xl-6 login-update-box lightGrayBackground'>
                    <div className='loginCardAlign'>
                        <img src={globe} alt='enmasse' />
                        <div>
                            <Heading
                                title='enmasse'
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                            />
                            <p className='text-muted login-p'>
                                Our team of skilled professionals is committed to delivering outstanding advisory services and customer support, enabling you to maximize your investment potential with us.
                            </p>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-md-6 login-update-box whiteBackground'>
                    <div className='loginCardAlign' >
                        <Heading
                            title='Login'
                            type={TypographyType.h2}
                            colour={TypographyColor.dark}
                        />
                        <p className='text-muted mb-4 login-p'>Enter your email ID and Password to login
                        </p>
                        <form className='loginCardAlign w-100' onSubmit={handleSubmit(onSubmit)}>
                            <Heading
                                title='Email'
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                            />
                            <input
                                // type="email"
                                // name='email_id'
                                {...register("email_id")}
                                className='my-1 px-2 inputBoxHeight w-100'
                                placeholder='Enter your email id here' />
                            {errors?.email_id?.message && <p className='text-danger m-0 p-0 fs-12'>{errors?.email_id?.message}</p>}
                            <div className='d-flex flex-row justify-content-between align-items-center mt-2'>
                                <Heading
                                    title='Password'
                                    type={TypographyType.h4}
                                    colour={TypographyColor.dark}
                                    classname='mb-0'
                                />
                                {/* <a href='' onClick={() => handleModal({ passwordModal: true })}>Forgot password?</a> */}
                                <Button
                                    type='button'
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.transparent}
                                    onClick={() => handleModal({ passwordModal: true })}
                                    classname='fw-bold text-decoration-underline h-50'
                                >
                                    Forgot password?
                                </Button>
                            </div>
                            <div className='input-wrapper'>
                                <input
                                    type={isVisible ? 'text' : 'password'}
                                    // name='password'
                                    {...register("password")}
                                    className='my-1 px-2 inputBoxHeight w-100'
                                    placeholder='Enter your password here'
                                />
                                <span className="eye-icon" onClick={toggleVisibility}>
                                    {isVisible ? <FaEye fontSize={22} /> : <FaEyeSlash fontSize={22} />}
                                </span>
                            </div>
                            {errors?.password?.message && <p className='text-danger m-0 p-0 fs-12'>{errors?.password?.message}</p>}
                            <Button
                                type='submit'
                                classname='mb-2 mt-4 height-3'
                                disabled={!isValid}
                                size={ButtonSize.large}
                                theme={ButtonTheme.primary}
                                variant={ButtonVariant.bordered}
                            //className={`mb-2 mt-4 inputBoxHeight login-btn text-white fs-6 bg-secondary ${(filledInputCount < 2) ? 'bg-secondary' : 'bg-dark'}`}
                            //disabled={filledInputCount < 2}
                            >
                                {isSubmitting && <span className="spinner-border spinner-border-sm me-3"></span>}Login
                            </Button>
                        </form>
                        <p className='text-muted mb-0 mt-2 login-p'>By clicking on continue you are agreeing to the Enmasse
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.small}
                                variant={ButtonVariant.transparent}
                                onClick={() => handleModal({ tncModal: true })}
                                classname='underline-text h-auto ps-0 pe-1 black'
                            >
                                Terms & conditions
                            </Button>
                            and
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.small}
                                variant={ButtonVariant.transparent}
                                onClick={() => handleModal({ tncModal: true })}
                                classname='underline-text h-auto ps-1 black'
                            >
                                Privacy policies
                            </Button>
                        </p>
                    </div>
                </div>

                {
                    showModal?.passwordModal && (
                        <ForgotPassword
                            showModal={showModal?.passwordModal}
                            handleModal={handleModal}
                            email={email}
                            handleEmailChange={handleEmailChange}
                            handleSendEmail={handleSendEmail}
                        />
                    )
                }

                {
                    showModal?.sendMailModal && (
                        <EmailSent
                            showModal={showModal?.sendMailModal}
                            handleModal={handleModal}
                            email={email}
                        />
                    )
                }

                {
                    showModal?.tncModal && (
                        <TermsAndConditions
                            showModal={showModal?.tncModal}
                            handleModal={handleModal}
                        />
                    )
                }
            </div >
        </div >
    )
}
