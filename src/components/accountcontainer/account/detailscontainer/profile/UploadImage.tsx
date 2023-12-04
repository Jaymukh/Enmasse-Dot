// External libraries
import React, { useRef } from 'react';
import { useRecoilValue } from "recoil";
import { BiUpload } from 'react-icons/bi';
import { MdDeleteSweep } from 'react-icons/md'
import { AiFillMinusCircle, AiFillPlusCircle } from 'react-icons/ai';

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
    setShowUploadImageModal: React.Dispatch<React.SetStateAction<boolean>>; // Update prop type
    openUploadImageModal: () => void;
    closeUploadImageModal: () => void;
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
    const imageRef = useRef(null);
    // const handleCropImage = () => {
    //     const image = imageRef.current;
    //   
    //     if (image) {
    //       // Calculate the dimensions of the cropped area
    //       const divWidth = 150; // Width of your div
    //       const divHeight = 150; // Height of your div
    //   
    //       // Create a canvas element to hold the cropped image
    //       const canvas = document.createElement('canvas');
    //       canvas.width = divWidth;
    //       canvas.height = divHeight;
    //   
    //       // Get the 2D context of the canvas
    //       const context = canvas.getContext('2d');
    //   
    //       // Calculate the position to crop the image
    //       const x = (image.width - divWidth) / 2;
    //       const y = (image.height - divHeight) / 2;
    //   
    //       // Draw the cropped portion of the image onto the canvas
    //       context.drawImage(image, x, y, divWidth, divHeight, 0, 0, divWidth, divHeight);
    //   
    //       // Get the cropped image as a data URL (base64)
    //       const croppedImage = canvas.toDataURL('image/jpeg');
    //   
    //       // You can use the 'croppedImage' data URL as needed (e.g., display it or save it).
    //   
    //       console.log('Cropped Image:', croppedImage);
    //     }
    //   };

    return (
        <div>
            <Modal showModal={showUploadImageModal} classname='width-30' >
                <div className='d-flex flex-row justify-content-between align-items-center mx-1 mt-1 mb-0'>
                    <Heading
                        title='Profile Photo'
                        type={TypographyType.h4}
                        colour={TypographyColor.dark}
                        classname='m-0'
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
                <div className="d-flex flex-column justify-content-center align-items-center mb-2 mx-1">
                    <div className="upload-image-box mb-2 d-flex justify-content-center align-items-center bg-light" >
                        {loggedUser?.profile_picture || newImage ? (
                            <img src={newImage ? newImage : loggedUser?.profile_picture} ref={imageRef} alt="Profile" style={{ width: `${zoomLevel}%` }} />
                        ) : (
                            <span className='m-auto fs-64 w-100 h-100 d-flex flex-column justify-content-center align-items-center' style={{ backgroundColor: loggedUser.userHSL, color: '#ffffff' }}>{loggedUser.initial}</span>
                        )}
                    </div>
                    {newImage ?
                        (<>
                            <div className='d-flex flex-row justify-content-around align-items-center w-100 mx-1 mb-2'>
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
                                    // style={{ background: `linear-gradient(to right, rgba(17, 24, 39, 1) ${(zoomLevel/2) - 10}%, rgba(217, 217, 217, 1) ${110 - (zoomLevel/2)}%)` }}
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
                                size={ButtonSize.default}
                                variant={ButtonVariant.bordered}
                                onClick={() => handleSaveImage()}
                                type='button'
                                classname=''
                            >
                                Save
                            </Button>
                        </>) :
                        (loggedUser?.profile_picture ?
                            <div className="d-flex flex-row justify-content-between">
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
                            </div> :
                            <label className="bg-dark rounded p-3 height-2-25 d-flex align-items-center justify-content-center m-auto">
                                <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                                <div className="d-flex file-input-content">
                                    <BiUpload fontSize={20} className='me-2 text-white' />
                                    <Body
                                        color={BodyColor.white}
                                        type={BodyType.p3}
                                    >
                                        Upload new photo
                                    </Body>
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