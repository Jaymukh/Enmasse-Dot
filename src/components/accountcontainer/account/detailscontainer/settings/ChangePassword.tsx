import React, { useEffect, useState } from 'react';
import '../../../../../styles/main.css';
import Drawer from '../../../../ui/Drawer';
import { GiPlainCircle } from 'react-icons/gi';
import { GoCheckCircleFill } from 'react-icons/go';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useUserService } from '../../../../../services';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { authState, errorState } from '../../../../../states';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import { Button, ButtonSize, ButtonTheme, ButtonVariant } from '../../../../ui/button/Button';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';

interface ChangePasswordProps {
    open: boolean,
    handleUpdateClick: () => void,
    handleDrawer: (open: boolean) => void
    handleShowModal: (flag: boolean) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = ({ open, handleUpdateClick, handleDrawer, handleShowModal }) => {
    const userService = useUserService();
    const auth = useRecoilValue(authState);
    const setError = useSetRecoilState(errorState);

    const [filledInputCount, setFilledInputCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    }

    const validationSchema = Yup.object().shape({
        current_password: Yup.string()
            .required('Current password is required'),
        new_password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Password must contain at least one special character')
            .matches(/[0-9]/, 'Password must contain at least one number')
            .test('different-password', 'New password cannot be the same as the current password', function (value) {
                const currentPassword = this.parent.current_password;
                return value !== currentPassword;
            }),
        confirm_new_password: Yup.string()
            .oneOf([Yup.ref('new_password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const validationOptions = [
        { key: 'lengthCheck', text: '8 Characters' },
        { key: 'uppercase', text: 'Contains Uppercase' },
        { key: 'specialChar', text: 'Contains Special character' },
        { key: 'number', text: 'Contains Number' },
    ];

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

    const updateObject = watch();

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
        userService.changePassword({ ...values, refresh: auth?.tokens?.refresh })
            .then((response: any) => {
                handleDrawer(false);
                handleShowModal(true);
            })
            .catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                setError({ type: 'Error', message: errorMsg });
            });
    };

    useEffect(() => {
        const values = watch(); // Get all form values
        const count = Object.values(values).filter(Boolean).length;  //`Boolean` is called as a function and it converts its argument into a boolean value. 
        setFilledInputCount(count);
    }, [updateObject, watch]);

    return (
        <Drawer
            id='change-password'
            title='Change Password'
            isOpen={open}
            toggleFunction={handleDrawer}
        >
            <div className='d-flex flex-column align-items-start justify-content-center text-start'>
                <Body
                    type={BodyType.p2}
                    color={BodyColor.muted}
                    classname=''>
                    You will be required to re-login after updating the password.
                </Body>
                <form className='d-flex flex-column align-items-start justify-content-center text-start' onSubmit={handleSubmit(onSubmit)}>
                    <Heading
                        title='Old Password'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='mb-0'
                    />
                    <input
                        type="password"
                        //name='current_password'
                        {...register("current_password")}
                        className='mediumMarginTopBottom inputBoxHeight my-1 px-2 fs-14 w-100'
                        placeholder='Old password'
                    />
                    {errors?.current_password?.message &&
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.warning}
                            classname=''>
                            {errors?.current_password?.message}
                        </Body>
                    }
                    <Heading
                        title='New Password'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='mt-2 mb-0 text-start'
                    />
                    <input
                        type="password"
                        //name='new_password'
                        {...register("new_password", {
                            onChange: (e) => {
                                handlePasswordChange(e)
                            }
                        })}
                        className='mediumMarginTopBottom inputBoxHeight my-1 px-2 fs-14 w-100'
                        placeholder='New password'
                    />
                    {errors?.new_password?.message &&
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.warning}
                            classname=''>
                            {errors?.new_password?.message}
                        </Body>
                    }
                    <div className="row my-2">
                        {validationOptions.map((item: { key: string, text: string }) => (
                            <div className="d-flex pe-0 mb-1">
                                {conditions[item?.key as keyof typeof conditions] ? <GoCheckCircleFill color='#108041' /> : <GiPlainCircle color='#CECECE' />}
                                <Body
                                    type={BodyType.p3}
                                    color={BodyColor.dark}
                                    classname='ms-2 mb-1'>
                                    {item.text}
                                </Body>
                            </div>
                        ))}
                    </div>
                    <Heading
                        title='Re enter new password'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='mb-0'
                    />
                    <input
                        type="password"
                        //name='confirm_new_password'
                        {...register("confirm_new_password")}
                        className='my-2 inputBoxHeight px-2 fs-14 w-100'
                        placeholder='Confirm new password'
                    />
                    {errors?.confirm_new_password?.message &&
                        <Body
                            type={BodyType.p3}
                            color={BodyColor.warning}
                            classname=''>
                            {errors?.confirm_new_password?.message}
                        </Body>
                    }
                    <Button
                        type='submit'
                        classname='mb-0 mt-4 height-3'
                        size={ButtonSize.large}
                        theme={ButtonTheme.primary}
                        variant={ButtonVariant.bordered}
                    >
                        {isSubmitting && <span className="spinner-border spinner-border-sm me-3"></span>}
                        Update
                    </Button>
                </form>
            </div>
        </Drawer>
    );
}
export default ChangePassword;

