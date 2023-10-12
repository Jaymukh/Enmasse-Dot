import React, { useState, useRef, useEffect } from 'react'
import { MdModeEdit } from 'react-icons/md';
import EditProfile from './EditProfile';
import '../../../../../App.css';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedUserState, spinnerState, User } from "../../../../../states";
import { useUserService } from '../../../../../services';
import { toast } from 'react-toastify';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import UploadImage from './UploadImage';

export default function Profile() {
    const [selectedData, setSelectedData] = useState<User | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const userService = useUserService();
    const setSpinner = useSetRecoilState(spinnerState);
    const [showUploadImageModal, setShowUploadImageModal] = useState(false);
    const [profileImage, setProfileImage] = useState<string | undefined>(loggedUser?.img);
    const [newImage, setNewImage] = useState<string | undefined>(undefined);    
    const [zoomLevel, setZoomLevel] = useState<number>(100);

    const handleOpen = (flag?: boolean) => {
        if (flag) {
            setSelectedData(loggedUser);
            setOpen(flag);
        } else {
            setSelectedData(null);
            setOpen(flag!);
        }
    };

    const handleCloseDialog = () => {
        setSelectedData(null);
    };

    const handleUpdate = (updatedData: any) => {
        setSpinner(true);
        const payload = { ...updatedData, country: 'India' };
        userService.updateUserDetails(payload)
            .then((response: any) => {
                if (response) {
                    handleCloseDialog();
                    setSpinner(false);
                    userService.getUserDetails();
                }
            })
            .catch(error => {
                setSpinner(false);
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
    };

    // functions for Upload Image Modal

    const openUploadImageModal = () => {
        setShowUploadImageModal(true);
    };
    const closeUploadImageModal = () => {
        setShowUploadImageModal(false);
        setNewImage(undefined);
        
    };
    const handleImageChange = (e: any) => {
        const selectedImage = e.target.files[0];
        setNewImage(URL.createObjectURL(selectedImage));
        //setProfileImage(URL.createObjectURL(selectedImage));
    };
    const handleSaveImage = () => {
        if (newImage) {
            setProfileImage(newImage);
            setNewImage(undefined);
        }
        setShowUploadImageModal(false);
    }

    return (
        <div className='container bg-white mt-4 me-5 px-0' style={{ height: '90%' }}>
            <div className="row mx-0 w-100 h-10 d-flex flex-row justify-content-between pt-3 pe-4">
                <Heading
                    title='Profile'
                    type={TypographyType.h2}
                    colour={TypographyColor.dark}
                    classname='mt-2 col-2 ms-3 text-start'
                />
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
                <div className="col-3  fs-64" >
                    <div className='position-relative'>
                        <div className="profile-image-box" style={{ backgroundColor: loggedUser.userHSL, color: '#ffffff' }}>
                            {profileImage ? <img src={profileImage} alt="Profile Photo" className='w-100 h-100' style={{ width: `${zoomLevel}%` }} /> : <span className='position-absolute profileImageAlignment text-center'>{loggedUser.initial}</span>}

                            <Button
                                theme={ButtonTheme.secondary}
                                size={ButtonSize.small}
                                variant={ButtonVariant.contained}
                                onClick={() => openUploadImageModal()}
                                classname='position-absolute rounded-circle editImageBtn'
                            >
                                <MdModeEdit className='mx-1 mb-1 color-black' fontSize={22} />
                            </Button>
                        </div>
                    </div>
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
            {openUploadImageModal &&
                <UploadImage
                    showUploadImageModal={showUploadImageModal}
                    setShowUploadImageModal={setShowUploadImageModal}
                    openUploadImageModal={openUploadImageModal}
                    closeUploadImageModal={closeUploadImageModal}
                    profileImage={profileImage}
                    handleImageChange={handleImageChange}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    newImage={newImage}
                    handleSaveImage={handleSaveImage}
                />}
        </div>
    )
}