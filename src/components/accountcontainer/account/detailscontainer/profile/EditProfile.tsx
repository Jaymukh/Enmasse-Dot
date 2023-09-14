import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import * as Constants from '../../../../../utils/constants/Constants'
import '../../../../../App.css';
import { useRecoilValue } from "recoil";
import { useSettingsService } from '../../../../../services';
import { AllSettingsState, User } from "../../../../../states";

interface EditProfileProps {
    selectedData: User;
    handleUpdate: (updatedRow: User) => void;
    handleCloseDialog: () => void;
}

export default function EditProfile({
    selectedData,
    handleUpdate,
    handleCloseDialog
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
        <div className=''>
            <Drawer
                anchor='right'
                open={selectedData !== null}
                onClose={handleCloseDialog}
                className='edit-profile-drawer-width edit-profile-drawer-padding'
            >
                <Box className='d-flex flex-wrap justify-content-between mb-2'>
                    <h5 className=''>
                        Edit Profile
                    </h5>
                    <button className='bg-white border-0' data-testid="CloseButton">
                        <CloseIcon onClick={handleCloseDialog} />
                    </button>
                </Box>
                <Box className='d-flex justify-content-center flex-column'>
                    <h6 className='my-2'>Name</h6>
                    <input type="text" placeholder="Enter your name" name='name' value={updatedData.name}
                        onChange={(e) => handleChangeData(e)} className='my-2  p-2 btn-outline-black inputBoxHeight' />
                    <h6 className='my-2'>Email</h6>
                    <input type="email" placeholder="Enter your Email ID" name='email_id' value={updatedData.email_id}
                        onChange={(e) => handleChangeData(e)} className='my-2  p-2 btn-outline-black inputBoxHeight' />
                    <h6 className='my-2'>Phone Number</h6>
                    <input type="tel" maxLength={10} placeholder="Enter your Phone number" name='phone_number' value={updatedData.phone_number}
                        onChange={(e) => handleChangeData(e)} className='my-2  p-2 btn-outline-black inputBoxHeight' />
                    <h6 className='my-2'>Role</h6>
                    <select name='role' className='mb-2 btn-outline-black inputBoxHeight text-left ' value={updatedData.role} onChange={(e) => handleChangeData(e)} >
                        {settings?.roles?.map((role) => (
                            <option key={role.id} value={role.name}>{role.name}</option>
                        ))}
                    </select>
                    <h6 className='my-2'>Designation</h6>
                    <input type="text" placeholder="Enter your designation" name='designation' value={updatedData.designation}
                        onChange={(e) => handleChangeData(e)} className='my-2  p-2 btn-outline-black inputBoxHeight' />
                    <h6 className='my-2'>Company</h6>
                    <select name='company' className='mb-2 btn-outline-black inputBoxHeight text-left ' value={updatedData.company} onChange={(e) => handleChangeData(e)} >
                    {Constants.company.map((company) => (
                            <option key={company.key} value={company.value}>{company.value}</option>
                        ))}
                    </select>
                    <h6 className='my-2'>Company Type</h6>
                    <select name='company_type' className='mb-2 btn-outline-black inputBoxHeight text-left ' value={updatedData.company_type} onChange={(e) => handleChangeData(e)} >
                        {settings?.company_types?.map((company_type) => (
                            <option key={company_type.id} value={company_type.name}>{company_type.name}</option>
                        ))}
                    </select>
                    <button className='btn-black inputBoxHeight my-5' onClick={handleUpdateClick}>Update Profile</button>
                </Box>
            </Drawer>
        </div>
    );
}