import React, { useState } from 'react';
import { GiPlainCircle } from 'react-icons/gi';
import { GoCheckCircleFill } from 'react-icons/go';
import { IoMdArrowBack } from 'react-icons/io';
import globe from '../../utils/images/globe.png';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserService } from '../../services';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { toast } from "react-toastify";
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

const UpdatePassword = () => {
    const navigate = useNavigate();
    const userService = useUserService();
    const validationSchema = Yup.object().shape({
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .matches(/[0-9]/, 'Password must contain at least one number'),
        confirm_password: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const { handleSubmit, register, watch, formState } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { errors, isSubmitting } = formState;

    const [conditions, setConditions] = useState({
        lengthCheck: false,
        uppercase: false,
        specialChar: false,
        number: false,
    });

    const password = watch('password');

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newPassword = e.target.value;
        setConditions({
            lengthCheck: newPassword.length >= 8,
            uppercase: /[A-Z]/.test(newPassword),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
            number: /\d/.test(newPassword),
        });
    };

    const onSubmit = (values: any) => {
        if (Object.values(errors).length > 0) {
            return;
        }
        userService.setNewPassword({ ...values, token: "c2276236f0824f5dbd9b054e741954c3" })
            .then(response => console.log(response))
            .catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
    };

    const handleSkip = () => {
        navigate(RouteConstants.root);
    }

    const handleNavigateBack = () => {
        navigate(RouteConstants.login);
    }

    return (
        <div className='row mx-0' style={{ height: '100vh', width: '100vw' }} >
            <div className='col-md-6 col-xl-6 login-update-box lightGrayBackground'>
                <div className='col-12 my-5 d-flex flex-column align-items-start'>
                    <button className='border-0 mx-5' onClick={handleNavigateBack}>
                        <IoMdArrowBack />Back
                    </button>
                    <div className='loginCardAlign my-5'>
                        <img src={globe} alt='enmasse' />
                        <div>
                            <h3>enmasse</h3>
                            <p className='text-muted login-p'>
                                Our team of skilled professionals id committed to delivering outstanding advisory services and customer support, enabling you to maximize your investment potential with us.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='col-md-6 col-md-6 login-update-box whiteBackground'>
                <form className='loginCardAlign' onSubmit={handleSubmit(onSubmit)}>
                    <h6 className='fs-27 mb-2'>Update Password</h6>
                    <p className='fs-14 text-muted mb-3'>Update password for your account.</p>
                    <h5 className='fs-16 mt-3'>Password</h5>
                    <input
                        type="password"
                        // name='password'
                        {...register("password", {
                            onChange: (e) => {
                                handlePasswordChange(e)
                            }
                        })}
                        className='my-1 px-2 inputBoxHeight w-100'
                        placeholder='Enter your password here' />
                    {errors?.password?.message && <p className='text-danger m-0 p-0'>{errors?.password?.message}</p>}
                    <div className="row my-2">
                        <div className="col-7 d-flex pe-0">
                            {conditions.lengthCheck ? <GoCheckCircleFill color='#108041' /> : <GiPlainCircle color='#CECECE' />}
                            <p className='fs-12 ms-2'>8 Characters</p>
                        </div>
                        <div className="col-5 d-flex pe-0">
                            {conditions.uppercase ? <GoCheckCircleFill color='#108041' /> : <GiPlainCircle color='#CECECE' />}
                            <p className='fs-12 ms-2'>Contains Uppercase</p>
                        </div>
                        <div className="col-7 d-flex pe-0">
                            {conditions.specialChar ? <GoCheckCircleFill color='#108041' /> : <GiPlainCircle color='#CECECE' />}
                            <p className='fs-12 ms-2'>Contains Special character</p>
                        </div>
                        <div className="col-5 d-flex pe-0">
                            {conditions.number ? <GoCheckCircleFill color='#108041' /> : <GiPlainCircle color='#CECECE' />}
                            <p className='fs-12 ms-2'>Contains Number</p>
                        </div>
                    </div>
                    <h5 className='fs-16'>Confirm password</h5>
                    <input
                        type="password"
                        // name="confirm_password"
                        {...register("confirm_password", {
                            onChange: (e) => {
                                handlePasswordChange(e)
                            }
                        })}
                        className='my-1 px-2 inputBoxHeight w-100'
                        placeholder='Re enter your password here' />
                    {errors?.confirm_password?.message && <p className='text-danger m-0 p-0'>{errors?.confirm_password?.message}</p>}
                    {/* <button type="submit" className='mb-2 mt-4 inputBoxHeight login-btn bg-dark text-white fs-6' >
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-3"></span>}
                        Update Password
                    </button> */}
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.bordered}
                        type='submit'
                        classname='m-auto'
                    >
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-3"></span>}
                        Update Password
                    </Button>
                    {/* <button className='bg-transparent black underline-text border-0 mt-3' onClick={() => handleSkip()}>
                    Skip
                    </button> */}
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.transparent}
                        onClick={() => handleSkip()}
                        type='button'
                        classname='text-decoration-underline mt-3'
                    >
                        Skip
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default UpdatePassword;