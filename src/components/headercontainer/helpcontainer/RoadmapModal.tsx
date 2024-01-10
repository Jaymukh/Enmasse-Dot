
// External libraries
import { useRecoilState } from 'recoil';

// CSS
import '../../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../../ui/typography/Body';
import Modal from '../../ui/modal/Modal';
import { spinnerState } from '../../../states';
import { Spinner } from '../../ui/spinner/Spinner';

// Utilities
import * as Constants from '../../../utils/constants/Constants';
import { useEffect, useState } from 'react';

interface RoadmapModalProps {
    showRoadmap: number;
    setShowRoadmap: (showRoadmap: number) => void;
    openRoadmapModal: boolean;
    setOpenRoadmapModal: (openRoadmapModal: boolean) => void;
    handleRoadmapClick: (openRoadmapModal: boolean) => void;
    handleContactUsDrawer: (contactUsDrawerOpen: boolean) => void;
}

const RoadmapModal: React.FC<RoadmapModalProps> = ({ showRoadmap, setShowRoadmap, openRoadmapModal, setOpenRoadmapModal, handleRoadmapClick, handleContactUsDrawer }) => {

    const [spinner, setSpinner] = useRecoilState(spinnerState);
    const [imageLoaded, setImageLoaded] = useState(false);

    const nextRoadmap = () => {
        if (showRoadmap < Constants.roadmapContent.length) {
            setShowRoadmap(showRoadmap + 1);
        }
        else {
            setOpenRoadmapModal(false);
        }
    };
    const previousHelp = () => {
        if (showRoadmap > 0) {
            setShowRoadmap(showRoadmap - 1);
        }
    };
    const handleContactNow = () => {
        setOpenRoadmapModal(false);
        handleContactUsDrawer(true);
    };
    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    useEffect(() => {
        setSpinner(!imageLoaded);
    }, [imageLoaded]);

    return (
        <div>
            <Modal showModal={openRoadmapModal} classname='width-62-5'>
                <div style={{ height: '70vh' }} className='d-flex flex-column justify-content-between'>
                    <div className='d-flex flex-row justify-content-end w-100 pb-1'>
                        <Button type="button" theme={ButtonTheme.dark} variant={ButtonVariant.transparent} classname="btn-close" onClick={() => setOpenRoadmapModal(false)}></Button>
                    </div>
                    <div className='d-flex flex-row align-items-center h-75 mx-3'>
                        <div className="col-5 d-flex flex-row justify-content-start align-items-center" style={{ height: 'auto' }}>
                            <img src={Constants.roadmapContent[showRoadmap - 1].image} onLoad={handleImageLoad} alt="Core Solutions" width='85%' style={{ display: imageLoaded ? 'block' : 'none' }} />
                        </div>
                        <div className="col-7 d-flex flex-column justify-content-center align-items-start text-start pe-2">
                            <Heading
                                title={Constants.roadmapContent[showRoadmap - 1].title}
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                                classname='test-start mb-3'
                            />
                            <Body
                                type={BodyType.p2}
                                color={BodyColor.dark}
                                classname='text-start'
                            >
                                {Constants.roadmapContent[showRoadmap - 1].description}
                            </Body>
                            {(showRoadmap === Constants.roadmapContent.length)
                                && <Button
                                    theme={ButtonTheme.secondary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.bordered}
                                    classname='h-2 mt-4'
                                    onClick={() => handleContactNow()}
                                >
                                    Contact Now
                                </Button>}
                        </div>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center mb-2 mx-3'>
                        <Body
                            type={BodyType.p2}
                            color={BodyColor.dark}
                            classname='text-start'
                        >
                            {showRoadmap}/{Constants.roadmapContent.length}
                        </Body>
                        <div className='d-flex flex-row justify-items-end align-items-center' >
                            {(showRoadmap > 1)
                                && <Button
                                    theme={ButtonTheme.secondary}
                                    size={ButtonSize.default}
                                    variant={ButtonVariant.bordered}
                                    classname='h-2 me-2'
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
                                onClick={nextRoadmap}
                            >
                                {(showRoadmap < Constants.roadmapContent.length) ? 'Next' : 'Continue'}
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default RoadmapModal;
