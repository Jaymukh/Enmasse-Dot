import React, { useState, useEffect } from 'react'
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditProfile from './EditProfile';
import '../../../../../App.css';
import { useRecoilValue } from "recoil";
import { loggedUserState, User } from "../../../../../states";
import { useUserService } from '../../../../../services';

export default function Profile() {

    const [selectedData, setSelectedData] = useState<User | null>(null);
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const userService = useUserService();
	useEffect(() => {
		userService.getUserDetails();
        console.log('loggedUser', loggedUser);
	}, []);

    const handleEditClick = () => {
        setSelectedData(loggedUser);
    };
    const handleCloseDialog = () => {
        setSelectedData(null);
    };

    const handleUpdate = (updatedData: any) => {
        const payload = {...updatedData, country: 'India'};
        userService.updateUserDetails(payload)
			.then((response) => {
				if (response) {
					handleCloseDialog();
                    userService.getUserDetails();
					console.log('Successfully Updated.', response);
				}
			})
			.catch(error => {
				console.log('Error while updating details',error);
			});
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
                            <p className="color-black">{loggedUser.name}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Phone:</p>
                            <p className="color-black">{loggedUser.phone_number}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Company Name:</p>
                            <p className="color-black">{loggedUser.company}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Role:</p>
                            <p className="color-black">{loggedUser.role}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-4">
                    <ul className='edit-profile-list'>
                        <li>
                            <p className="text-muted fs-6  mb-0">Email Id:</p>
                            <p className="color-black">{loggedUser.email_id}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Designation:</p>
                            <p className="color-black">{loggedUser.designation}</p>
                        </li>
                        <li >
                            <p className="text-muted fs-6  mb-0">Country:</p>
                            <p className="color-black">{loggedUser.country}</p>
                        </li>
                    </ul>
                </div>
            </div>
            {selectedData && (
                <EditProfile
                    selectedData={selectedData}
                    handleCloseDialog={handleCloseDialog}
                    handleUpdate={handleUpdate}
                />
            )}
        </div>
    )
}