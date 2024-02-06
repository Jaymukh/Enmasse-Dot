// External libraries
import { useState } from 'react';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import ReactGA from 'react-ga';

// CSS
import '../../styles/main.css';

// Components
import globe from '../../utils/images/LoginGlobe.svg';
import ForgotPassword from './ForgotPassword';
import EmailSent from './EmailSent';
import TermsAndConditions from './TermsAndConditions';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';
import { errorState, spinnerState } from "../../states";

// Utilities
import { useUserService } from '../../services';


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
    const setError = useSetRecoilState(errorState);
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
        ReactGA.exception({
            description: 'An error ocurred',
            fatal: true
        });
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
        userService.forgotPassword({ "email_id": email })
            .then((response: any) => {
                if (response) {
                    setError({ type: 'Success', message: response.message });
                    setSpinner(false);
                }
            })
            .catch((error: any) => {
                setSpinner(false);
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                setError({ type: 'Error', message: errorMsg });
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
                <div className='col-md-6 col-xl-6 login-update-box bg-white'>
                    <div className='loginCardAlign'>
                        <img src={globe} alt='enmasse' width={454} height={338} />
                        <div>
                            <Heading
                                title='enmasse'
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                            />
                            <Body
                                type={BodyType.p3}
                                color={BodyColor.muted}
                            >
                                Our team of skilled professionals is committed to delivering outstanding advisory services and customer support, enabling you to maximize your investment potential with us.
                            </Body>
                        </div>
                    </div>
                </div>
                <div className='col-md-6 col-md-6 login-update-box '>
                    <div className='loginCardAlign' >
                        <Heading
                            title='Login'
                            type={TypographyType.h2}
                            colour={TypographyColor.dark}
                        />
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.muted}
                            classname='mb-4'
                        >
                            Enter your email ID and Password to login
                        </Body>
                        <form className='loginCardAlign w-100' onSubmit={handleSubmit(onSubmit)}>
                            <Heading
                                title='Email'
                                type={TypographyType.h5}
                                colour={TypographyColor.dark}
                            />
                            <input
                                {...register("email_id")}
                                className='my-1 px-2 inputBoxHeight w-100'
                                placeholder='Enter your email id here'
                            />
                            {errors?.email_id?.message
                                && <Body
                                    type={BodyType.p3}
                                    color={BodyColor.warning}
                                    classname='m-0 p-0'
                                >
                                    {errors?.email_id?.message}
                                </Body>
                            }
                            <div className='d-flex flex-row justify-content-between align-items-center mt-2 '>
                                <Heading
                                    title='Password'
                                    type={TypographyType.h5}
                                    colour={TypographyColor.dark}
                                    classname='mb-0'
                                />
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
                                <Body
                                    type={BodyType.p3}
                                    color={BodyColor.dark}
                                    classname='eye-icon'
                                    onClick={toggleVisibility}
                                >
                                    {isVisible ? <FaEye fontSize={22} /> : <FaEyeSlash fontSize={22} />}
                                </Body>
                            </div>
                            {errors?.password?.message
                                && <Body
                                    type={BodyType.p3}
                                    color={BodyColor.warning}
                                    classname='m-0 p-0'
                                >
                                    {errors?.password?.message}
                                </Body>
                            }
                            <Button
                                type='submit'
                                classname='mb-2 mt-4 height-3'
                                disabled={!isValid}
                                size={ButtonSize.large}
                                theme={ButtonTheme.primary}
                                variant={ButtonVariant.bordered}
                            >
                                {isSubmitting
                                    && <Body
                                        type={BodyType.p3}
                                        color={BodyColor.dark}
                                        classname='spinner-border spinner-border-sm me-3'
                                    />
                                }Login
                            </Button>
                        </form>
                        <Body
                            type={BodyType.p1}
                            color={BodyColor.secondary}
                            classname='mb-0 mt-2'
                        >
                            By clicking on continue you are agreeing to the Enmasse
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.large}
                                variant={ButtonVariant.transparent}
                                onClick={() => handleModal({ tncModal: true })}
                                classname='underline-text h-auto px-1 w-auto'
                            >
                                Terms & conditions
                            </Button>
                            and
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.large}
                                variant={ButtonVariant.transparent}
                                onClick={() => handleModal({ tncModal: true })}
                                classname='underline-text h-auto ps-1 black w-auto'
                            >
                                Privacy policies
                            </Button>
                        </Body>

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
