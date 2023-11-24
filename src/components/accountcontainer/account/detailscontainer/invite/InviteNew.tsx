import React, { useEffect } from 'react';
import Drawer from '../../../../ui/Drawer';
import '../../../../../App.css';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useUserService, useSettingsService } from '../../../../../services';
import { loggedUserState, AllSettingsState, errorState } from "../../../../../states";
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import { Input } from '../../../../ui/input/Input';
interface NewData {
    name: string | undefined;
    email_id: string | undefined;
    role: string | undefined;
    company: string | undefined;
    company_type: string | undefined;
}
interface InviteNewProps {
    openInviteNew: boolean;
    handleCloseInviteNew: () => void;
    setOpenInviteSent: (openInviteSent: boolean) => void;
    newData: NewData;
    setNewData: React.Dispatch<React.SetStateAction<NewData>>;
    handleChangeData: (event: any) => void;
}

const InviteNew: React.FC<InviteNewProps> = ({
    openInviteNew,
    handleCloseInviteNew,
    setOpenInviteSent,
    newData,
    setNewData,
    handleChangeData
}) => {

    const userService = useUserService();
    const loggedUser = useRecoilValue(loggedUserState);
    const settings = useRecoilValue(AllSettingsState);
    const setError = useSetRecoilState(errorState);
    const settingsService = useSettingsService();


    const handleSubmitInviteNew = () => {
        if (newData.name && newData.email_id && newData.company && newData.role && newData.company_type) {
            var payload = { ...newData, user_id: loggedUser.user_id, designation: 'Manager', country: 'India', phone_number: 5436525362, status: 'Invited' };
            userService.inviteNew(payload)
                .then((response: any) => {
                    if (response) {
                        userService.getAll();
                        setOpenInviteSent(true);
                        handleCloseInviteNew();
                    }
                })
                .catch(error => {
                    const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                    setError({ type: 'Error', message: errorMsg });
                });
        }
        else {
            setError({ type: 'Error', message: "All fields are mendatory!" });
        }
    };

    //function to get all the settings details
    useEffect(() => {
        settingsService.getAllSettings();
    }, []);

    return (
        <>
            <Drawer
                id='invite'
                title='Invite'
                isOpen={openInviteNew}
                toggleFunction={handleCloseInviteNew}
            >
                <div className='d-flex flex-column align-items-start justify-content-center text-start'>
                    <Heading
                        title='Name*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='mt-2'
                    />
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={newData.name}
                        name='name'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Email*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='mt-2'
                    />
                    <Input
                        type="email"
                        placeholder="Enter your Email ID"
                        value={newData.email_id}
                        name='email_id'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Company*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='mt-2'
                    />
                    <Input
                        type="text"
                        placeholder="Enter your Company name"
                        value={newData?.company}
                        name='company'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <Heading
                        title='Role*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='mt-2'
                    />
                    <Select
                        options={settings?.roles}
                        onChange={(e) => handleChangeData(e)}
                        value={newData?.role}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='role'
                    />
                    <Heading
                        title='Company Type*'
                        type={TypographyType.h5}
                        colour={TypographyColor.dark}
                        classname='mt-2'
                    />
                    <Select
                        options={settings?.company_types}
                        value={newData?.company_type}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='company_type'
                    />
                    <Body
                        type={BodyType.p3}
                        color={BodyColor.dark}
                        classname='Note'>
                        Note: Admins will be able to invite users to the platform
                    </Body>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleSubmitInviteNew()}
                        classname='my-3 height-3'
                    >
                        Invite
                    </Button>
                </div>
            </Drawer>

        </>
    );
}

export default InviteNew;
