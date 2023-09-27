import React, { useState, useEffect } from 'react'
import { MdModeEdit } from 'react-icons/md';
import EditProfile from './EditProfile';
import '../../../../../App.css';
import { useRecoilValue } from "recoil";
import { loggedUserState, User } from "../../../../../states";
import { useUserService } from '../../../../../services';
import { toast } from 'react-toastify';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';

export default function Profile() {

    const [selectedData, setSelectedData] = useState<User | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const userService = useUserService();
    useEffect(() => {
        userService.getUserDetails();
        console.log('loggedUser', loggedUser);
    }, []);

    const handleEditClick = () => {
        setSelectedData(loggedUser);
    };

    const handleOpen = (flag?: boolean) => {
        if (flag) {
            setSelectedData(loggedUser);
            setOpen(flag);
        } else {
            setSelectedData(null);
            setOpen(flag!);
        }
    }

    const handleCloseDialog = () => {
        setSelectedData(null);
    };

    const handleUpdate = (updatedData: any) => {
        const payload = { ...updatedData, country: 'India' };
        userService.updateUserDetails(payload)
            .then((response) => {
                if (response) {
                    handleCloseDialog();
                    userService.getUserDetails();
                    console.log('Successfully Updated.', response);
                }
            })
            .catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
    };

    return (
        <div className='container bg-white mt-4 me-5 px-0' style={{ height: '90%' }}>
            <div className="row mx-0 w-100 h-10 d-flex flex-row justify-content-between pt-3 pe-4">
                <h5 className='mt-2 col-2 ms-3 text-start'>Profile</h5>
                <Button
                    theme={ButtonTheme.secondary}
                    size={ButtonSize.default}
                    variant={ButtonVariant.contained}
                    onClick={() => handleOpen(true)}
                >
                    <MdModeEdit className='mx-1 mb-1 color-black' fontSize={22} />
                    Edit Profile
                </Button>
            </div>
            <hr />
            <div className="row w-100 mx-3">
                <div className="col-3 d-flex justify-content-center align-items-center fs-64" style={{ backgroundColor: loggedUser.userHSL, color: '#ffffff' }}>
                    {loggedUser?.img ? <img src={loggedUser.img} alt="Profile Photo" className='profile-image-box' /> : (loggedUser.initial)}
                </div>
                <div className="col-4 ps-5">
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
                    handleUpdate={handleUpdate}
                    open={open}
                    handleOpen={handleOpen}
                />
            )}
        </div>
    )
}