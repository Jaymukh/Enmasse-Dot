import React, { useRef, useState } from 'react';
import '../../../../../styles/main.css';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../../../ui/typography/Heading';
import { BiUpload } from 'react-icons/bi';
import { MdDeleteSweep } from 'react-icons/md'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';
import { useRecoilValue, useSetRecoilState } from "recoil";
import { loggedUserState, spinnerState, User } from "../../../../../states";
import Modal from '../../../../ui/modal/Modal';

interface UploadImageProps {
    showUploadImageModal: boolean;
    setShowUploadImageModal: React.Dispatch<React.SetStateAction<boolean>>; // Update prop type
    openUploadImageModal: () => void;
    closeUploadImageModal: () => void;
    profileImage: string | undefined;
    handleImageChange: (event: any) => void;
    zoomLevel: number;
    setZoomLevel: (level: number) => void;
    newImage: string | undefined;
    handleSaveImage: () => void;
    handleZoomIn: () => void;
    handleZoomOut: () => void;
    handleSliderChange: (e: any) => void;
    minZoom: number;
    maxZoom: number;
    handleDeleteModel: (showDeleteImageModal: boolean) => void;
}

const UploadImage: React.FC<UploadImageProps> = ({
    showUploadImageModal,
    setShowUploadImageModal,
    openUploadImageModal,
    closeUploadImageModal,
    profileImage,
    handleImageChange,
    zoomLevel,
    setZoomLevel,
    newImage,
    handleSaveImage,
    handleZoomIn,
    handleZoomOut,
    handleSliderChange,
    minZoom,
    maxZoom,
    handleDeleteModel
}) => {
    const loggedUser = useRecoilValue<User>(loggedUserState);


    return (
        <div>
            <Modal showModal={showUploadImageModal} classname='width-30' >
                <div className='d-flex flex-row justify-content-between align-items-center'>
                    <Heading
                        title='Profile Photo'
                        type={TypographyType.h2}
                        colour={TypographyColor.dark}
                        classname=''
                    />
                    <Button
                        theme={ButtonTheme.primary}
                        size={ButtonSize.small}
                        variant={ButtonVariant.transparent}
                        onClick={() => closeUploadImageModal()}
                        type='button'
                        classname='btn-close'
                    />
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center my-2">
                    <div className="upload-image-box my-5 d-flex justify-content-center align-items-center bg-light" >
                        {profileImage || newImage ? (
                            <img src={newImage ? newImage : profileImage} alt="Profile Photo" style={{ width: `${zoomLevel}%` }} />
                        ) : (
                            <span className='m-auto fs-64 w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: loggedUser.userHSL, color: '#ffffff' }}>{loggedUser.initial}</span>
                        )}
                    </div>
                    {newImage ?
                        (<>
                            <div className='d-flex flex-row justify-content-around'>
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.medium}
                                    variant={ButtonVariant.transparent}
                                    onClick={() => handleZoomOut()}
                                    type='button'
                                    classname='w-auto m-auto'
                                >
                                    <AiFillMinusCircle fontSize={22} />
                                </Button>
                                <input
                                    type="range"
                                    min={minZoom}
                                    max={maxZoom}
                                    value={zoomLevel}
                                    onChange={handleSliderChange}
                                />
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.medium}
                                    variant={ButtonVariant.transparent}
                                    onClick={() => handleZoomIn()}
                                    type='button'
                                    classname='w-auto m-auto'
                                >
                                    <AiFillPlusCircle fontSize={22} />
                                </Button>
                            </div>
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.medium}
                                variant={ButtonVariant.bordered}
                                onClick={() => handleSaveImage()}
                                type='button'
                                classname=''
                            >
                                Save
                            </Button>
                        </>) :
                        (profileImage ?
                            <div className="d-flex flex-row justify-content-between">
                                <Button
                                    theme={ButtonTheme.secondary}
                                    size={ButtonSize.small}
                                    variant={ButtonVariant.contained}
                                    onClick={() => handleDeleteModel(true)}
                                    type='button'
                                    classname='me-2'
                                >
                                    <MdDeleteSweep fontSize={20} className='color-orange' />
                                    Delete
                                </Button>
                                <label className="bg-dark rounded px-3 height-2-25 d-flex align-items-center justify-content-center m-auto">
                                    <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                    <div className="">
                                        <BiUpload fontSize={20} className='me-2 text-white' />
                                        <span className='text-white'>Upload new photo</span>
                                    </div>
                                </label>
                            </div> :
                            <label className="bg-dark rounded p-3 height-2-25 d-flex align-items-center justify-content-center m-auto">
                                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                <div className="file-input-content">
                                    <BiUpload fontSize={20} className='me-2 text-white' />
                                    <span className='text-white'>Upload new photo</span>
                                </div>
                            </label>
                        )
                    }
                </div>
            </Modal>
        </div>
    )
}

export default UploadImage;