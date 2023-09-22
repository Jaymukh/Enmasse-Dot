import React, { useEffect, useState } from 'react';
import Drawer from '../../../../ui/Drawer';
import * as Constants from '../../../../../utils/constants/Constants'
import '../../../../../App.css';
import { useRecoilValue } from "recoil";
import { useSettingsService } from '../../../../../services';
import { AllSettingsState, User } from "../../../../../states";
import Select, { SelectSize } from '../../../../ui/select/Select';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';

interface EditProfileProps {
    selectedData: User;
    handleUpdate: (updatedRow: User) => void;
    open: boolean,
    handleOpen: () => void;
}

export default function EditProfile({
    selectedData,
    handleUpdate,
    open,
    handleOpen
}: EditProfileProps) {

    // all settings's data
    const settingsService = useSettingsService();
    const settings = useRecoilValue(AllSettingsState);

    //function to get all the settings details
    useEffect(() => {
        settingsService.getAllSettings();
    }, []);

    const [updatedData, setUpdatedData] = useState<User>(selectedData);

    const handleChangeData = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        e.preventDefault();
        const name = e.target.name as keyof User;
        const value = e.target.value;
        setUpdatedData({ ...updatedData, [name]: value });
    };

    const handleUpdateClick = () => {
        handleUpdate(updatedData);
    };

    return (
        <Drawer
            id='edit-profile'
            title='Edit Profile'
            isOpen={open}
            toggleFunction={handleOpen}
        >
            <div className='d-flex justify-content-center flex-column px-3'>
                <h6 className='mt-1 font-87-5 text-start'>Name</h6>
                <input type="text" placeholder="Enter your name" name='name' value={updatedData.name}
                    onChange={(e) => handleChangeData(e)} className='mb-2 p-2 btn-outline-black drawer-input-box-height' />
                <h6 className='mt-1 font-87-5 text-start'>Email</h6>
                <input type="email" placeholder="Enter your Email ID" name='email_id' value={updatedData.email_id}
                    onChange={(e) => handleChangeData(e)} className='mb-2 p-2 btn-outline-black drawer-input-box-height' />
                <h6 className='mt-1 font-87-5 text-start'>Phone Number</h6>
                <input type="tel" maxLength={10} placeholder="Enter your Phone number" name='phone_number' value={updatedData.phone_number}
                    onChange={(e) => handleChangeData(e)} className='mb-2 p-2 btn-outline-black drawer-input-box-height' />
                <h6 className='mt-1 font-87-5 text-start'>Role</h6>
                <Select
                    options={settings?.roles}
                    value={updatedData?.role}
                    labelKey='name'
                    valueKey='name'
                    size={SelectSize.large}
                    name='role'
                />
                <h6 className='mt-1 font-87-5 text-start'>Designation</h6>
                <input type="text" placeholder="Enter your designation" name='designation' value={updatedData.designation}
                    onChange={(e) => handleChangeData(e)} className='mb-2 p-2 btn-outline-black drawer-input-box-height' />
                <h6 className='mt-1 font-87-5 text-start'>Company</h6>
                <Select
                    options={Constants?.company}
                    value={updatedData?.company}
                    labelKey='value'
                    valueKey='value'
                    size={SelectSize.large}
                    name='company'
                />
                <h6 className='mt-1 font-87-5 text-start'>Company Type</h6>
                <Select
                    options={settings?.company_types}
                    value={updatedData?.company_type}
                    labelKey='name'
                    valueKey='name'
                    size={SelectSize.large}
                    name='company_type'
                />
                <Button
                    theme={ButtonTheme.primary}
                    size={ButtonSize.large}
                    variant={ButtonVariant.contained}
                    onClick={() => handleUpdateClick()}
                    classname='my-3'
                >
                    Update Profile
                </Button>            </div>
        </Drawer>
    );
}