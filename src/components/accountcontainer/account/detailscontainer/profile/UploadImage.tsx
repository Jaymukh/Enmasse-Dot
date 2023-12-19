// External libraries
import React, { useRef, useState } from 'react';
import { useRecoilValue } from "recoil";
import Cropper from 'react-easy-crop';
import { BiUpload } from 'react-icons/bi';
import { MdDeleteSweep } from 'react-icons/md'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { IoMdCheckmark } from "react-icons/io";

// CSS
import '../../../../../styles/main.css';

// Componentss
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import Body, { BodyColor, BodyType } from '../../../../ui/typography/Body';
import Modal from '../../../../ui/modal/Modal';
import { loggedUserState, User } from "../../../../../states";


interface UploadImageProps {
    showUploadImageModal: boolean;
    closeUploadImageModal: () => void;
    handleImageChange: (event: any) => void;
    zoom: number;
    setZoom: (level: number) => void;
    newImage: string | undefined;
    handleSaveImage: () => void;
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleSliderChange: (e: any) => void;
    minZoom: number;
    maxZoom: number;
    handleDeleteModel: (showDeleteImageModal: boolean) => void;
    handleCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
    crop: any;
    setCrop: any;
}

const UploadImage: React.FC<UploadImageProps> = ({
    showUploadImageModal,
    closeUploadImageModal,
    handleImageChange,
    zoom,
    setZoom,
    newImage,
    handleSaveImage,
    handleZoomIn,
    handleZoomOut,
    handleSliderChange,
    minZoom,
    maxZoom,
    handleDeleteModel,
    handleCropComplete,
    crop,
    setCrop,
}) => {
    const loggedUser = useRecoilValue<User>(loggedUserState);
    const imageRef = useRef(null);

    return (
        <div>
            <Modal showModal={showUploadImageModal} >
                <div className=''>
                    <div className='d-flex flex-row justify-content-between align-items-center mt-1 mb-3'>
                        <Heading
                            title={newImage ? 'Update Profile Photo' : 'Profile Photo'}
                            type={TypographyType.h4}
                            colour={TypographyColor.dark}
                            classname='m-0 mb-2'
                        />
                        <button className='btn-close p-0' onClick={() => closeUploadImageModal()}></button>
                    </div>
                    <div>
                        {newImage ?
                            <>
                                <div className='upload-image-box mx-auto' style={{ maxWidth: '500px', position: 'relative' }}>
                                    <Cropper
                                        image={newImage || ''}
                                        crop={crop}
                                        zoom={zoom}
                                        rotation={0}
                                        aspect={1}
                                        onZoomChange={setZoom}
                                        onCropChange={setCrop}
                                        onCropComplete={handleCropComplete}
                                    />
                                </div>
                                <div className='d-flex flex-row justify-content-around align-items-center w-100 mx-0 mb-3 mt-4'>
                                    <Button
                                        theme={ButtonTheme.primary}
                                        size={ButtonSize.medium}
                                        variant={ButtonVariant.transparent}
                                        onClick={() => handleZoomOut()}
                                        type='button'
                                        classname='w-auto m-auto ps-0 pe-2'
                                    >
                                        <AiFillMinusCircle fontSize={22} />
                                    </Button>
                                    <input
                                        type="range"
                                        min={1}
                                        max={3}
                                        step={0.1}
                                        value={zoom}
                                        onChange={(event) => handleSliderChange(event.target.value)}
                                    // style={{ background: `linear-gradient(to right, rgba(17, 24, 39, 1) ${(zoomLevel/2) - 10}%, rgba(217, 217, 217, 1) ${110 - (zoomLevel/2)}%)` }}
                                    />
                                    <Button
                                        theme={ButtonTheme.primary}
                                        size={ButtonSize.medium}
                                        variant={ButtonVariant.transparent}
                                        onClick={() => handleZoomIn()}
                                        type='button'
                                        classname='w-auto m-auto ps-2 pe-0'
                                    >
                                        <AiFillPlusCircle fontSize={22} />
                                    </Button>
                                </div>
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.bordered}
                                    onClick={() => handleSaveImage()}
                                    type='button'
                                    classname=''
                                >
                                    <IoMdCheckmark fontSize={20} className='me-2' />
                                    Save
                                </Button>
                            </> :
                            (loggedUser?.profile_picture ? (
                                <>
                                    <div className="upload-image-box mb-3 d-flex justify-content-center align-items-center bg-light" >
                                        <img src={loggedUser?.profile_picture} ref={imageRef} alt="Profile" className='w-100 h-100' />
                                    </div>
                                    <div className="d-flex flex-row justify-content-between mt-1">
                                        <Button
                                            theme={ButtonTheme.secondary}
                                            size={ButtonSize.small}
                                            variant={ButtonVariant.bordered}
                                            onClick={() => handleDeleteModel(true)}
                                            type='button'
                                            classname='me-2'
                                        >
                                            <MdDeleteSweep fontSize={20} className='color-orange me-2' />
                                            Delete
                                        </Button>
                                        <label className="bg-dark rounded px-3 height-2-25 d-flex align-items-center justify-content-center m-auto">
                                            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                            <div className="d-flex">
                                                <BiUpload fontSize={20} className='me-2 text-white' />
                                                <Body
                                                    color={BodyColor.white}
                                                    type={BodyType.p3}
                                                >
                                                    Upload new photo
                                                </Body>
                                            </div>
                                        </label>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="upload-image-box mb-4 d-flex justify-content-center align-items-center bg-light" >
                                        <span className='m-auto fs-64 w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: loggedUser.userHSL, color: '#ffffff' }}>{loggedUser.initial}</span>
                                    </div>
                                    <label className="bg-dark rounded p-3 height-2-25 d-flex align-items-center justify-content-center"  style={{ width: 'fit-content' }}>
                                        <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                        <div className="d-flex">
                                            <BiUpload fontSize={20} className='me-2 text-white' />
                                            <Body
                                                color={BodyColor.white}
                                                type={BodyType.p3}
                                            >
                                                Upload new photo
                                            </Body>
                                        </div>
                                    </label>
                                </>
                            ))
                        }
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default UploadImage;