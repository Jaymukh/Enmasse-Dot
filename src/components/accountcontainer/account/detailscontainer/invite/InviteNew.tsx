import React, { useState, useEffect } from 'react';
import Drawer from '../../../../ui/Drawer';
import * as Constants from '../../../../../utils/constants/Constants';
import '../../../../../App.css';
import { useRecoilValue } from "recoil";
import { useUserService, useSettingsService } from '../../../../../services';
import { loggedUserState, AllSettingsState, User } from "../../../../../states";
import { toast } from "react-toastify";
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
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
    handleChangeData : (event: any) => void;
}

const InviteNew: React.FC<InviteNewProps> = ({
    openInviteNew,
    handleCloseInviteNew,
    setOpenInviteSent,
    newData,
    handleChangeData
}) => {


    
    const userService = useUserService();
    const loggedUser = useRecoilValue(loggedUserState);
    const settings = useRecoilValue(AllSettingsState);
    const settingsService = useSettingsService();
    
    
    const handleSubmitInviteNew = () => {
        if (newData.name && newData.email_id) {
            var payload = { ...newData, user_id: loggedUser.user_id, designation: 'Manager', country: 'India', phone_number: 5436525362, status: 'Invited' };
            userService.inviteNew(payload)
                .then((response) => {
                    if (response) {
                        toast.success('Successfully Invited.');
                        userService.getAll();
                        setOpenInviteSent(true);
                    }
                })
                .catch(error => {
                    const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                    toast.error(errorMsg);
                });
            handleCloseInviteNew();
        }
        else{
            toast.error("All fields are mendatory!");
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
                <div className='d-flex justify-content-center flex-column px-3'>
                    <h6 className='mt-1 font-87-5 text-start'>Name</h6>
                    <Input
                        type="text"
                        placeholder="Enter your name"
                        value={newData.name}
                        name='name'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <h6 className='mt-1 font-87-5 text-start'>Email</h6>
                    <Input
                        type="email"
                        placeholder="Enter your Email ID"
                        value={newData.email_id}
                        name='email_id'
                        onChange={(e) => handleChangeData(e)}
                    />
                    <h6 className='my-1 font-87-5 text-start'>Role</h6>
                    <Select
                        options={settings?.roles}
                        onChange={(e) => handleChangeData(e)}
                        value={newData?.role}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='role'
                    />
                    <h6 className='mt-1 font-87-5 text-start'>Company</h6>
                    <Select
                        options={Constants?.company}
                        value={newData?.company}
                        labelKey='value'
                        valueKey='value'
                        size={SelectSize.large}
                        name='company'
                    />
                    <h6 className='mt-1 font-87-5 text-start'>Company Type</h6>
                    <Select
                        options={settings?.company_types}
                        value={newData?.company_type}
                        labelKey='name'
                        valueKey='name'
                        size={SelectSize.large}
                        name='company_type'
                    />
                    <p className='my-3 Note d-flex justify-content-center align-items-center'>Note: Admins will be able to invite users to the platform</p>
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.large}
                        variant={ButtonVariant.bordered}
                        onClick={() => handleSubmitInviteNew()}
                        classname='mt-4 mb-3'
                    >
                        Invite
                    </Button>
                </div>
            </Drawer>
            
        </>
    );
}

export default InviteNew;
