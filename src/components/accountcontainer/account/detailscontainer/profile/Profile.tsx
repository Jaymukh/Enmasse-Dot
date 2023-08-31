import React, { useState } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditProfile from './EditProfile';
import '../../../../../App.css';
import * as Constants from '../../../../../utils/constants/Constants';

interface ProfileData {
    name: string;
    email: string;
    phone: number;
    designation: string;
    company: string;
    country: string;
    role: string;
}
export default function Profile() {

    // function for EditInvite dialog
    const [profileData, setProfileData] = useState<ProfileData>(Constants.profileData);
    const [selectedData, setSelectedData] = useState<ProfileData | null>(null);

    const handleEditClick = () => {
        setSelectedData(profileData);
    };
    const handleCloseDialog = () => {
        setSelectedData(null);
    };

    const handleUpdate = (updatedRow: ProfileData) => {
        setProfileData(updatedRow);
        handleCloseDialog();
    };

    return (
        <div className='container bg-white w-90 h-100 mt-4 detail-container me-5'>
            <div className="row w-100 h-10 d-flex flex-row justify-content-between pt-3 pl-4">
                <h5 className='mt-2 col-2'>Profile</h5>
                <button className='btn btn-outline-secondary width-fit-content-button' onClick={() => handleEditClick()}>
                    <ModeEditIcon className='mx-1 mb-1 color-black' />
                    Edit Profile
                </button>
            </div>
            <hr />
            <div className="row w-100">
                <div className="col-3 d-flex justify-content-center">
                    <img src="" alt="Profile Photo" className='profile-image-box'/>
                </div>
                <div className="col-4">
                    <ul className='edit-profile-list'>
                        <li >
                            <p className="text-muted fs-6  mb-0">Name:</p>
                            <p className="color-black">{profileData.name}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Phone:</p>
                            <p className="color-black">{profileData.phone}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Company Name:</p>
                            <p className="color-black">{profileData.company}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Role:</p>
                            <p className="color-black">{profileData.role}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-4">
                    <ul className='edit-profile-list'>
                        <li >
                            <p className="text-muted fs-6  mb-0">Email Id:</p>
                            <p className="color-black">{profileData.email}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Designation:</p>
                            <p className="color-black">{profileData.designation}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Country:</p>
                            <p className="color-black">{profileData.country}</p>
                        </li>
                    </ul>
                </div>
            </div>
            {selectedData && (
                <EditProfile
                    selectedData={selectedData}
                    handleCloseDialog={handleCloseDialog}
                    // profileData={profileData}
                    setProfileData={setProfileData}
                    handleUpdate={handleUpdate}
                />
            )}
        </div>
    )
}