import '../../../styles/main.css';
import IndiaMap from '../../../utils/images/IndiaMap.png';
import CoreSolutions from '../../../utils/images/CoreSolutions.png';
import * as Constants from '../../../utils/constants/Constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../../ui/typography/Heading';
import Body, { BodyType, BodyColor } from '../../ui/typography/Body';
import Modal from '../../ui/modal/Modal';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { overlayState, helpState } from '../../../states';

interface OverlayModalProps {
    handleContactUsDrawer: (contactUsDrawerOpen: boolean) => void;
}

const OverlayModal: React.FC<OverlayModalProps> = ({ handleContactUsDrawer }) => {
    const overlay = useRecoilValue(overlayState);
    const setOverlay = useSetRecoilState(overlayState);
    const setShowHelp = useSetRecoilState(helpState);
    const showHelp = useRecoilValue(helpState);

    const handleModal = () => {
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

    return (
        <div>
            <Modal showModal={overlay} classname='width-62-5'>
                {(showHelp === 0)
                    && <div className='d-flex flex-row justify-content-center mb-2'>
                        <div className="col-6">
                            <img src={IndiaMap} alt="India Map" width='75%' />
                        </div>
                        <div className="col-6 d-flex flex-column justify-content-center align-items-start">
                            <Heading
                                title='Hello! Welcome to Enmasse | D.O.T.S'
                                type={TypographyType.h2}
                                colour={TypographyColor.dark}
                                classname='mb-3'
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
                                classname='h-2'
                                onClick={() => nextHelp()}
                            >
                                Continue
                            </Button>
                        </div>
                    </div>
                }
                {(0 < showHelp) && (showHelp <= Constants.helpContent.length) && (
                    <div>
                        <div className='d-flex flex-row justify-content-end w-100 pb-1'>
                            <Button type="button" theme={ButtonTheme.secondary} variant={ButtonVariant.transparent} classname="btn-close" onClick={() => handleModal()}></Button>
                        </div>
                        <div className='d-flex flex-row justify-content-center mb-2'>
                            <div className="col-6">
                                <img src={CoreSolutions} alt="Core Solutions" width='50%' />
                            </div>
                            <div className="col-6 d-flex flex-column justify-content-center align-items-start text-start">
                                <Heading
                                    title={Constants.helpContent[showHelp - 1].title}
                                    type={TypographyType.h2}
                                    colour={TypographyColor.dark}
                                    classname='test-start mb-3'
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
                                        classname='h-2 mt-2'
                                        onClick={() => handleContactNow()}
                                    >
                                        Contact Now
                                    </Button>}
                            </div>
                        </div>
                        <div className='d-flex flex-row justify-content-between align-items-center mb-2'>
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
