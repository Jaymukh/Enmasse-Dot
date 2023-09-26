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
}

const InviteNew: React.FC<InviteNewProps> = ({
    openInviteNew,
    handleCloseInviteNew
}) => {


    const [newData, setNewData] = useState<NewData>({
        name: undefined,
        email_id: undefined,
        role: 'Admin',
        company: 'enmasse',
        company_type: 'Enmasse',
    });
    const userService = useUserService();
    const loggedUser = useRecoilValue(loggedUserState);
    const settings = useRecoilValue(AllSettingsState);
    const settingsService = useSettingsService();

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        var name = e.target.name;
        var value = e.target.value;
        setNewData({ ...newData, [name]: value });
    }
    const handleSubmitInviteNew = () => {
        var payload = { ...newData, user_id: loggedUser.user_id, designation: 'Manager', country: 'India', phone_number: 5436525362, status: 'Invited' };
        userService.inviteNew(payload)
            .then((response) => {
                if (response) {
                    toast.success('Successfully Invited.');
                    userService.getAll();
                }
            })
            .catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
        handleCloseInviteNew();
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
                    <input type="text" placeholder="Enter your name" value={newData.name} name='name'
                        onChange={(e) => handleChangeData(e)} className='mb-2 p-2 btn-outline-black ' />
                    <h6 className='mt-1 font-87-5 text-start'>Email</h6>
                    <input type="email" placeholder="Enter your Email ID" value={newData.email_id} name='email_id'
                        onChange={(e) => handleChangeData(e)} className='mb-2  p-2 btn-outline-black drawer-input-box-height' />
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
                        variant={ButtonVariant.transparent}
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
