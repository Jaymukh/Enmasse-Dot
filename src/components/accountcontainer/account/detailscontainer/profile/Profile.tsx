import React, { useState } from 'react'
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
import DeleteImage from './DeleteImage';

export default function Profile() {
    const [selectedData, setSelectedData] = useState<User | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const userService = useUserService();
    const setSpinner = useSetRecoilState(spinnerState);

    const [showUploadImageModal, setShowUploadImageModal] = useState(false);
    const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
    const [newImage, setNewImage] = useState<string | undefined>(undefined);
    const [zoomLevel, setZoomLevel] = useState<number>(100);
    const minZoom = 50;
    const maxZoom = 200;

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
                    toast.success(response.msg);
                }
            })
            .catch((error: any) => {
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
    };


    // Function to convert an image URL to base64
    const imageUrlToBase64 = async (url: any) => {
        try {
            const response = await fetch(url);
            const blob = await response.blob();
            const base64Data = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(blob);
            });
            return base64Data;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            return null;
        }
    };
    const handleSaveImage = () => {
        if (newImage) {
            setSpinner(true);
            imageUrlToBase64(newImage)
                .then((base64Data) => {
                    if (typeof base64Data === 'string' && base64Data.length > 0) {
                        const maxImageSize = 1 * 64 * 1024; // 64KB (adjust as needed)
                        const img = new Image();
                        img.src = base64Data; // Image is the base64 image 
                        const sizeInBytes = new TextEncoder().encode(base64Data).length;
                        const sizeInKB = sizeInBytes / 1024;
                        const sizeInMB = sizeInKB / 1024;
                        img.onload = () => {
                            if (img.width * img.height <= maxImageSize) {
                                // The image is smaller than 100KB, no need to resize
                                const resizedImage = base64Data;
                                if (resizedImage) {
                                    userService.updateUserImage({ 'image': resizedImage })
                                        .then((response: any) => {
                                            if (response) {
                                                setSpinner(false);
                                                userService.getUserDetails();
                                                setShowUploadImageModal(false);
                                                toast.success('Successfully Uploaded profile picture.', {
                                                    position: toast.POSITION.BOTTOM_CENTER
                                                });
                                                setNewImage(undefined);
                                            }
                                        })
                                        .catch(error => {
                                            setSpinner(false);
                                            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                                            toast.error(errorMsg);
                                        });
                                }

                            } else {
                                // Resize the image
                                const scaleFactor = Math.sqrt(maxImageSize / (img.width * img.height));
                                const canvas = document.createElement('canvas');
                                canvas.width = img.width * scaleFactor;
                                canvas.height = img.height * scaleFactor;
                                const ctx = canvas.getContext('2d');
                                ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
                                const resizedImage = canvas.toDataURL('image/jpeg', 0.7); // Adjust format and quality as 
                                const sizeInBytes = new TextEncoder().encode(resizedImage).length;
                                const sizeInKB = sizeInBytes / 1024;
                                const sizeInMB = sizeInKB / 1024;
                                if (resizedImage) {
                                    userService.updateUserImage({ 'image': resizedImage })
                                        .then((response: any) => {
                                            if (response) {
                                                setSpinner(false);
                                                userService.getUserDetails();
                                                setShowUploadImageModal(false);
                                                toast.success('Successfully Uploaded profile picture.', {
                                                    position: toast.POSITION.BOTTOM_CENTER
                                                });
                                                setNewImage(undefined);
                                            }
                                        })
                                        .catch(error => {
                                            setSpinner(false);
                                            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                                            toast.error(errorMsg);
                                        });
                                }
                            }
                        };

                    }
                });
        }
        else {
            console.log('Please select an Image.');
        }

    };


    // Function to handle zoom slider changes
    const handleZoomIn = () => {
        if (zoomLevel < maxZoom) {
            setZoomLevel(zoomLevel + 10);
        }
    };

    const handleZoomOut = () => {
        if (zoomLevel > minZoom) {
            setZoomLevel(zoomLevel - 10);
        }
    };

    const handleSliderChange = (e: any) => {
        setZoomLevel(parseInt(e.target.value, 10));
    };

    const handleDeleteModel = (showDeleteImageModal: boolean) => {
        setShowUploadImageModal(false);
        setShowDeleteImageModal(showDeleteImageModal);
    }

    const handleDeleteClick = () => {
        setSpinner(true);
        userService.updateUserImage({ 'image': '' })
            .then((response: any) => {
                if (response) {
                    setSpinner(false);
                    userService.getUserDetails();
                    toast.success('Successfully Deleted.', {
                        position: toast.POSITION.BOTTOM_CENTER
                    });
                    setNewImage(undefined);
                }
            })
            .catch(error => {
                setSpinner(false);
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
        setShowDeleteImageModal(false);
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
                    variant={ButtonVariant.bordered}
                    onClick={() => handleOpen(true)}
                >
                    <MdModeEdit className='mx-1 mb-1' fontSize={22} />
                    Edit Profile
                </Button>
            </div>
            <hr />
            <div className="row w-100 mx-3">
                <div className="col-3  fs-64 ms-3" >
                    <div className='d-flex flex-column justify-content-end align-items-end'>
                        <div className="profile-image-box d-flex flex-column w-100 h-100 d-flex align-items-center justify-content-center bg-light" >
                            {loggedUser?.profile_picture ? <img src={loggedUser?.profile_picture} alt="Profile" className='' /> : <span className='d-flex flex-column justify-content-center align-items-center w-100 h-100' style={{ backgroundColor: loggedUser.userHSL, color: '#ffffff' }}>{loggedUser.initial}</span>}
                        </div>
                        <Button
                            theme={ButtonTheme.secondary}
                            size={ButtonSize.small}
                            variant={ButtonVariant.bordered}
                            onClick={() => openUploadImageModal()}
                            classname='rounded-circle editImageBtn align-self-end p-0'
                        >
                            <MdModeEdit className='mx-1 mb-1' fontSize={22} />
                        </Button>
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
                    handleImageChange={handleImageChange}
                    zoomLevel={zoomLevel}
                    setZoomLevel={setZoomLevel}
                    newImage={newImage}
                    handleSaveImage={handleSaveImage}
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                    handleSliderChange={handleSliderChange}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    handleDeleteModel={handleDeleteModel}
                />}

            {showDeleteImageModal && <DeleteImage showDeleteImageModal={showDeleteImageModal}
                handleDeleteModel={handleDeleteModel}
                handleDeleteClick={handleDeleteClick} />}
        </div>
    )
}