import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Select from '@mui/material/Select';
import { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import '../../../../../App.css';

interface ProfileData {
    name: string;
    email: string;
    phone: number;
    designation: string;
    company: string;
    country: string;
    role: string;
}

interface EditProfileProps {
    selectedData: ProfileData;
    setProfileData: React.Dispatch<React.SetStateAction<ProfileData>>;
    handleUpdate: (updatedRow: ProfileData) => void;
    handleCloseDialog: () => void;
}

export default function EditProfile({
    selectedData,
    setProfileData,
    handleUpdate,
    handleCloseDialog
}: EditProfileProps) {

    const [updatedData, setUpdatedData] = useState<ProfileData>(selectedData);

    const handleChangeData = (e: React.ChangeEvent<{ name?: string; value: unknown }> | SelectChangeEvent<string>) => {
        e.preventDefault();
        const name = e.target.name as keyof ProfileData;
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
                    <input type="email" placeholder="Enter your Email ID" name='email' value={updatedData.email}
                        onChange={(e) => handleChangeData(e)} className='my-2  p-2 btn-outline-black inputBoxHeight' />
                    <h6 className='my-2'>Phone Number</h6>
                    <input type="tel" maxLength={10} placeholder="Enter your phone number" name='phone' value={updatedData.phone}
                        onChange={(e) => handleChangeData(e)} className='my-2  p-2 btn-outline-black inputBoxHeight' />
                    <h6 className='my-2'>Country</h6>
                    <Select
                        name='country'
                        value={updatedData.country}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        className='btn-outline-black inputBoxHeight p-0'
                        onChange={(e) => handleChangeData(e)}
                    >
                        <MenuItem value='India'>India</MenuItem>
                        <MenuItem value='China'>China</MenuItem>
                        <MenuItem value='England'>England</MenuItem>
                    </Select>
                    <h6 className='my-2'>Company</h6>
                    <input type="text" placeholder="Business Name" name='company' value={updatedData.company}
                        onChange={(e) => handleChangeData(e)} className='my-2  p-2 btn-outline-black inputBoxHeight' />
                    <h6 className='my-2'>Designation</h6>
                    <input type="text" placeholder="Email ID" name='designation' value={updatedData.designation}
                        onChange={(e) => handleChangeData(e)} className='my-2  p-2 btn-outline-black inputBoxHeight' />
                    <h6 className='my-2'>Role</h6>
                    <Select
                        sx={{ minWidth: 200 }}
                        name='role'
                        value={updatedData.role}
                        onChange={(e) => handleChangeData(e)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        className='btn-outline-black inputBoxHeight p-0'
                    >
                        <MenuItem value='Admin'>Admin</MenuItem>
                        <MenuItem value='User'>User</MenuItem>
                    </Select>
                    <button className='btn-black inputBoxHeight my-5' onClick={handleUpdateClick}>Update Profile</button>
                </Box>
            </Drawer>
        </div>
    );
}