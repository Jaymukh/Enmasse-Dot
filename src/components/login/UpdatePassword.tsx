import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { GiPlainCircle } from 'react-icons/gi';
import { GoCheckCircleFill } from 'react-icons/go';
import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import globe from '../../utils/images/globe.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserService } from '../../services';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import CheckGIF from "../../utils/images/CheckMarkGIF.gif";
import { useSetRecoilState } from 'recoil';
import { errorState } from '../../states';
import Body, { BodyType, BodyColor } from '../ui/typography/Body';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const userService = useUserService();
    // const arr = window.location.href.split("=");
    // const token = arr.pop();
    const [searchParams] = useSearchParams();
    const setError = useSetRecoilState(errorState);
    const token = searchParams.get('token');
    const [passwordCreated, setPasswordCreated] = useState(false);
    const validationSchema = Yup.object().shape({
        new_password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .matches(/[0-9]/, 'Password must contain at least one number'),
        confirm_new_password: Yup.string()
            .oneOf([Yup.ref('new_password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const { handleSubmit, register, watch, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { errors, isSubmitting, isValid } = formState;

    const [conditions, setConditions] = useState({
        lengthCheck: false,
        uppercase: false,
        specialChar: false,
        number: false,
    });

    const validationOptions = [
        { key: 'lengthCheck', text: '8 Characters' },
        { key: 'uppercase', text: 'Contains Uppercase' },
        { key: 'specialChar', text: 'Contains Special character' },
        { key: 'number', text: 'Contains Number' },
    ];

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setConditions({
            lengthCheck: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            number: /\d/.test(newPassword),
        });
    };

    const [isVisible, setIsVisible] = useState(false);
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    const onSubmit = (values: any) => {
        if (Object.values(errors).length > 0) {
            return;
        }
        userService.setNewPassword({ ...values, token: token })
            .then((response: any) => {
                setPasswordCreated(true);
            })
            .catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                setError({ type: 'Error', message: errorMsg });
            });
    };
    const handleContinue = () => {
        navigate(RouteConstants.login);
    }

    //     const handleSkip = () => {
    //         navigate(RouteConstants.root);
    //     }
    // 
    //     const handleNavigateBack = () => {
    //         navigate(RouteConstants.login);
    //     }


    return (
        <div className='row mx-0' style={{ height: '100vh', width: '100vw' }} >
            <div className='col-md-6 col-xl-6 login-update-box lightGrayBackground'>
                <div className='col-12 my-5 d-flex flex-column align-items-start'>
                    {/* <button className='border-0 mx-5' onClick={handleNavigateBack}>
                        <IoMdArrowBack />Back
                    </button> */}
                    <div className='loginCardAlign my-5'>
                        <img src={globe} alt='enmasse' />
                        <div>
                            <Heading
                                title='enmasse'
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                            />
                            <p className='text-muted login-p'>
                                Our team of skilled professionals id committed to delivering outstanding advisory services and customer support, enabling you to maximize your investment potential with us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-6 col-md-6 login-update-box whiteBackground'>
                {passwordCreated ?
                    <div className='loginCardAlign'>
                        <div className='d-flex justify-content-center'>
                            <img src={CheckGIF} alt="Created Successfully GIF" width={319} height={319}></img>
                        </div>
                        <Heading
                            title='Created Successfully'
                            type={TypographyType.h2}
                            colour={TypographyColor.dark}
                            classname='text-center mb-2'
                        />
                        <p className='fs-14 text-muted mb-3 text-center'>Password created successfully!</p>
                        <Button
                            theme={ButtonTheme.primary}
                            size={ButtonSize.large}
                            variant={ButtonVariant.bordered}
                            type='button'
                            onClick={handleContinue}
                            classname='mt-3'
                        >
                            Continue
                        </Button>
                    </div>
                    :
                    <form className='loginCardAlign' onSubmit={handleSubmit(onSubmit)}>
                        <Heading
                            title='Create a Password'
                            type={TypographyType.h2}
                            colour={TypographyColor.dark}
                            classname='mb-2'
                        />
                        <p className='fs-14 text-muted mb-3'>Create password for your account.</p>
                        <Heading
                            title='Password'
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='mt-3 text-start'
                        />
                        <div className='input-wrapper'>
                            <input
                                type={isVisible ? 'text' : 'password'}
                                // name='new_password'
                                {...register("new_password", {
                                    onChange: (e) => {
                                        handlePasswordChange(e)
                                    }
                                })}
                                className='my-1 px-2 inputBoxHeight w-100'
                                placeholder='Enter your password here'
                            />
                            <span className="eye-icon" onClick={toggleVisibility}>
                                {isVisible ? <FaEye fontSize={22} /> : <FaEyeSlash fontSize={22} />}
                            </span>
                        </div>
                        {errors?.new_password?.message && <p className='text-danger m-0 p-0'>{errors?.new_password?.message}</p>}
                        <div className="row my-2">
                            {validationOptions.map((item: { key: string, text: string }, index: number) => (
                                <div className='col-6 d-flex pe-0'>
                                    {conditions[item?.key as keyof typeof conditions] ? <GoCheckCircleFill color='#108041' /> : <GiPlainCircle color='#CECECE' />}
                                    <Body
                                        type={BodyType.p3}
                                        color={BodyColor.dark}
                                        classname='ms-2'>
                                        {item.text}
                                    </Body>
                                </div>
                            ))}
                        </div>
                        <Heading
                            title='Confirm password'
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='text-start'
                        />
                        <input
                            type="password"
                            // name="confirm_new_password"
                            {...register("confirm_new_password")}
                            className='my-1 px-2 inputBoxHeight w-100'
                            placeholder='Re enter your password here' />
                        {errors?.confirm_new_password?.message && <p className='text-danger m-0 p-0'>{errors?.confirm_new_password?.message}</p>}
                        <Button
                            theme={ButtonTheme.primary}
                            size={ButtonSize.large}
                            variant={ButtonVariant.bordered}
                            type='submit'
                            classname='mt-3'
                            disabled={!isValid}
                        >
                            {isSubmitting && <span className="spinner-border spinner-border-sm me-3"></span>}
                            Create Password
                        </Button>
                    </form>
                }
            </div>
        </div>
    )
}

export default UpdatePassword;