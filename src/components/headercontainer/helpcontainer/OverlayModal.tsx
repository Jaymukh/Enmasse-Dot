/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AiOutlineClose } from "react-icons/ai";

// CSS
import '../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../../ui/typography/Body';
import Modal from '../../ui/modal/Modal';
import { overlayState, helpState, spinnerLiteState } from '../../../states';

// Utilities
import IndiaMap from '../../../utils/images/IndiaMap.png';
import CoreSolutions from '../../../utils/images/CoreSolutions.png';
import * as Constants from '../../../utils/constants/Constants';
import { SpinnerLite } from '../../ui/spinner/SpinnerLite';

interface OverlayModalProps {
    handleContactUsDrawer: (contactUsDrawerOpen: boolean) => void;
}

const OverlayModal: React.FC<OverlayModalProps> = ({ handleContactUsDrawer }) => {
    const setSpinnerLite = useSetRecoilState(spinnerLiteState);
    const [imageLoaded, setImageLoaded] = useState(false);
    const overlay = useRecoilValue(overlayState);
    const setOverlay = useSetRecoilState(overlayState);
    const setShowHelp = useSetRecoilState(helpState);
    const showHelp = useRecoilValue(helpState);

    const handleOverlayModal = () => {
        setOverlay(false);
    };

    const nextHelp = () => {
        if (showHelp < Constants.helpContent.length) {
            setShowHelp(showHelp + 1);
        }
        else {
            setOverlay(false);
        }
    };
    const previousHelp = () => {
        if (showHelp > 0) {
            setShowHelp(showHelp - 1);
        }
    };
    const handleContactNow = () => {
        setOverlay(false);
        handleContactUsDrawer(true);
    }
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useEffect(() => {
        setSpinnerLite(!imageLoaded);
    }, [imageLoaded]);

    return (
        <div>
            <Modal showModal={overlay} classname='width-62-5'>
                {(showHelp === 0)
                    && <div className='d-flex flex-row justify-content-center margin-bottom-2 w-100' style={{ height: '70vh' }}>
                        <div className="col-6 d-flex flex-row justify-content-center align-items-center">
                            <img src={IndiaMap} alt="India Map" width='75%' />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center align-items-start">
                            <Heading
                                title='Hello! Welcome to Enmasse | D.O.T.S'
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                                classname='margin-bottom-3'
                            />
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.dark}
                                classname='text-start'
                            >
                                Entrepreneurial households: represent households with its members engaged in opportunities of potential growth and economic activities
                            </Body>
                            <Button
                                theme={ButtonTheme.primary}
                                size={ButtonSize.default}
                                variant={ButtonVariant.bordered}
                                classname='h-2 margin-top-4'
                                onClick={() => nextHelp()}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                }
                {(0 < showHelp) && (showHelp <= Constants.helpContent.length) && (
                    <div style={{ height: '70vh' }} className='d-flex flex-column justify-content-between'>
                        <div className='d-flex flex-row justify-content-end w-100 padding-bottom-1'>
                            <Button type="button" theme={ButtonTheme.primary} variant={ButtonVariant.transparent} classname='padding-left-right-0' onClick={() => handleOverlayModal()}>
                            <AiOutlineClose fontSize={20} />
                            </Button>
                        </div>
                        <div className='d-flex flex-row align-items-center h-75 margin-left-right-3'>
                            <div className="col-5 d-flex flex-row justify-content-start align-items-center" style={{ height: 'auto' }}>
                                <img src={CoreSolutions} alt="Core Solutions" onLoad={handleImageLoad} width='85%' style={{ display: imageLoaded? 'block' : 'none' }} />
                            {(imageLoaded === false)  && <SpinnerLite /> }
                            </div>
                            <div className="col-7 d-flex flex-column justify-content-center align-items-start text-start padding-right-2">
                                <Heading
                                    title={Constants.helpContent[showHelp - 1].title}
                                    type={TypographyType.h2}
                                    colour={TypographyColor.dark}
                                    classname='test-start margin-bottom-3'
                                />
                                <Body
                                    type={BodyType.p2}
                                    color={BodyColor.dark}
                                    classname='text-start'
                                >
                                    {Constants.helpContent[showHelp - 1].description}
                                </Body>
                                {(showHelp === Constants.helpContent.length)
                                    && <Button
                                        theme={ButtonTheme.secondary}
                                        size={ButtonSize.default}
                                        variant={ButtonVariant.bordered}
                                        classname='h-2 margin-top-4'
                                        onClick={() => handleContactNow()}
                                    >
                                        Contact Now
                                    </Button>}
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-between align-items-center margin-bottom-2 margin-left-right-3'>
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.dark}
                                classname='text-start'
                            >
                                {showHelp}/{Constants.helpContent.length}
                            </Body>
                            <div className='d-flex flex-row justify-items-end align-items-center' >
                                {(showHelp > 1)
                                    && <Button
                                        theme={ButtonTheme.secondary}
                                        size={ButtonSize.default}
                                        variant={ButtonVariant.bordered}
                                        classname='h-2 margin-right-2'
                                        onClick={previousHelp}
                                    >
                                        Previous
                                    </Button>
                                }
                                <Button
                                    theme={ButtonTheme.primary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.bordered}
                                    classname='h-2'
                                    onClick={nextHelp}
                                >
                                    {(showHelp < Constants.helpContent.length) ? 'Next' : 'Continue'}
                                </Button>
                            </div>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default OverlayModal;
