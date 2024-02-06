// External libraries
import React, { useState } from 'react'
import { MdModeEdit } from 'react-icons/md';
import { useRecoilValue, useSetRecoilState } from "recoil";

// CSS
import '../../../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import UploadImage from './UploadImage';
import DeleteImage from './DeleteImage';
import EditProfile from './EditProfile';
import { errorState, loggedUserState, spinnerState, User } from "../../../../../states";

// Utilities
import { useUserService } from '../../../../../services';
import { useMapHelpers } from '../../../../../helpers';
import WIPDrawer from '../../../../mapContainer/WIPDrawer';

export default function Profile() {
    const [selectedData, setSelectedData] = useState<User | null>(null);
    // const [open, setOpen] = useState<boolean>(false);
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const userService = useUserService();
    const setSpinner = useSetRecoilState(spinnerState);
    const setError = useSetRecoilState(errorState);

    const [open, setOpen] = useState(false);
	const [text, setText] = useState<string>('');

    const [showUploadImageModal, setShowUploadImageModal] = useState(false);
    const [showDeleteImageModal, setShowDeleteImageModal] = useState(false);
    const [newImage, setNewImage] = useState<string | undefined>(undefined);
    const [zoom, setZoom] = useState<number>(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number; height: number; x: number; y: number; }>({ width: 0, height: 0, x: 0, y: 0 });
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const { getCroppedImg } = useMapHelpers();

    const minZoom = 1;
    const maxZoom = 3;

    const closeWIPDrawer = () => {
		setOpen(false);
		setText('');
	};

	const handleWIPDrawer = (text: string) => {
		setText(text);
		setOpen(true);
	}

    // const handleOpen = (flag?: boolean) => {
    //     if (flag) {
    //         setSelectedData(loggedUser);
    //         setOpen(flag);
    //     } else {
    //         setSelectedData(null);
    //         setOpen(flag!);
    //     }
    // };

    const handleCloseDialog = () => {
        setSelectedData(null);
    };

    // const handleUpdate = (updatedData: any) => {
    //     setSpinner(true);
    //     const payload = { ...updatedData, country: 'India' };
    //     userService.updateUserDetails(payload)
    //         .then((response: any) => {
    //             if (response) {
    //                 handleCloseDialog();
    //                 setSpinner(false);
    //                 userService.getUserDetails();
    //                 setError({ type: 'Success', message: response.msg });
    //             }
    //         })
    //         .catch((error: any) => {
    //             setSpinner(false);
    //             const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
    //             setError({ type: 'Error', message: errorMsg });
    //         });
    // };

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
            setError({ type: 'Error', message: 'Error converting image to base64' });
            return null;
        }
    };

    const handleCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }

    const handleSaveImage = async () => {
        setSpinner(true);
        try {
            const croppedImage = await getCroppedImg(
                newImage,
                croppedAreaPixels,
                0
            )
            const base64Img = await imageUrlToBase64(croppedImage);
            userService.updateUserImage({ 'image': base64Img })
                .then((response: any) => {
                    if (response) {
                        setSpinner(false);
                        userService.getUserDetails();
                        setShowUploadImageModal(false);
                        setError({ type: 'Success', message: 'Successfully Uploaded profile picture.' });
                        setNewImage(undefined);
                    }
                })
                .catch(error => {
                    setSpinner(false);
                    const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                    setError({ type: 'Error', message: errorMsg });
                });
        } catch (e) {
            console.error(e)
        }
    }

    const handleZoomIn = () => {
        if (zoom < maxZoom) {
            setZoom(zoom + 0.1);
        }
    };

    const handleZoomOut = () => {
        if (zoom > minZoom) {
            setZoom(zoom - 0.1);
        }
    };

    const handleSliderChange = (value: any) => {
        setZoom(Number(value));
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
                    setError({ type: 'Success', message: 'Successfully Deleted.' });
                    setNewImage(undefined);
                }
            })
            .catch(error => {
                setSpinner(false);
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                setError({ type: 'Error', message: errorMsg });
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
                    classname='col-2 ms-3 ps-2 text-start'
                />
                <Button
                    theme={ButtonTheme.secondary}
                    size={ButtonSize.default}
                    variant={ButtonVariant.bordered}
                    // onClick={() => handleOpen(true)}
                    onClick={() => handleWIPDrawer('Edit Profile')}
                >
                    <MdModeEdit className='me-1 mb-1' fontSize={22} />
                    Edit
                </Button>
            </div>
            <hr className='mb-4' />
            <div className="row w-100 mx-2">
                <div className="col-3 p-0 fs-64 ms-3" >
                    <div className='d-flex flex-column justify-content-start align-items-start' style={{ width: '12.5rem', height: '12.5rem' }}>
                        <div className="profile-image-box d-flex flex-column w-100 h-100 d-flex align-items-center justify-content-center bg-light" >
                            {loggedUser?.profile_picture ? <img src={loggedUser?.profile_picture} alt="Profile" className='w-100 h-100' /> :
                                <span className='d-flex flex-column justify-content-center align-items-center w-100 h-100' style={{ backgroundColor: loggedUser.userHSL, color: '#ffffff' }}>
                                    {loggedUser.initial}
                                </span>
                            }
                        </div>
                        <Button
                            theme={ButtonTheme.secondary}
                            size={ButtonSize.small}
                            variant={ButtonVariant.contained}
                            onClick={() => openUploadImageModal()}
                            classname='rounded-circle editImageBtn align-self-end p-0'
                        >
                            <MdModeEdit className='mx-1 mb-1' fontSize={22} />
                        </Button>
                    </div>
                </div>
                <div className="col-3">
                    <ul className='edit-profile-list text-start'>
                        <li >
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.secondary}
                                classname='mb-1 text-start'>Name:</Body>
                            <Heading
                                title={loggedUser.name}
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                                classname='text-start m-0'
                            />
                        </li>
                        <li >
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.secondary}
                                classname='mb-1 text-start'>Company:</Body>
                            <Heading
                                title={loggedUser.company}
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                                classname='text-start m-0'
                            />
                        </li>
                    </ul>
                </div>
                <div className="col-4">
                    <ul className='edit-profile-list'>
                        <li>
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.secondary}
                                classname='mb-1 text-start'>Email:</Body>
                            <Heading
                                title={loggedUser.email_id}
                                type={TypographyType.h4}
                                colour={TypographyColor.dark}
                                classname='text-start m-0'
                            />
                        </li>
                    </ul>
                </div>
            </div>
            {/* {selectedData && (
                <EditProfile
                    selectedData={selectedData}
                    handleUpdate={handleUpdate}
                    open={open}
                    handleOpen={handleOpen}
                />
            )} */}
            {open && <WIPDrawer open={open} title={text} closeWIPDrawer={closeWIPDrawer} />}

            {showUploadImageModal &&
                <UploadImage
                    showUploadImageModal={showUploadImageModal}
                    closeUploadImageModal={closeUploadImageModal}
                    handleImageChange={handleImageChange}
                    zoom={zoom}
                    setZoom={setZoom}
                    newImage={newImage}
                    handleSaveImage={handleSaveImage}
                    handleZoomIn={handleZoomIn}
                    handleZoomOut={handleZoomOut}
                    handleSliderChange={handleSliderChange}
                    minZoom={minZoom}
                    maxZoom={maxZoom}
                    handleDeleteModel={handleDeleteModel}
                    handleCropComplete={handleCropComplete}
                    crop={crop}
                    setCrop={setCrop}
                />}

            {showDeleteImageModal && <DeleteImage showDeleteImageModal={showDeleteImageModal}
                handleDeleteModel={handleDeleteModel}
                handleDeleteClick={handleDeleteClick} />}
        </div>
    )
}