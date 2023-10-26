import '../../App.css';
import '../../styles/main.css';
import img4 from '../../utils/images/img4.png';
import React, { useState, useEffect } from 'react';
import { MdOutlineTravelExplore } from 'react-icons/md';
import * as Constants from '../../utils/constants/Constants';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import Search from '../ui/search/Search';
import Modal from '../ui/modal/Modal';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { mapFeatureState } from '../../states/MapFeatureState';
import { useMapsService } from '../../services/Maps.service';
import { showHelpState, spinnerState } from '../../states';

const OverlayModal = () => {
    const showHelp = useRecoilValue(showHelpState);
    const [showModal, setshowModal] = useState<boolean>(true);

    const handleModal = () => {
        setshowModal(false);
    }
    // const handleHelpClick = () => {
	// 	setOverlay(true);
	// 	setShow(1);
	// }

    return (
        <div>
            <Modal showModal={showModal} classname='width-62-5'>
                <div className='d-flex flex-row justify-content-center mb-2'>
                    <div className="col-6">
                        <img src={img4} alt="India Map Image" />
                    </div>
                    <div className="col-6 d-flex flex-column justify-content-center align-items-center">
                        <Heading
                            title='Explore Now'
                            type={TypographyType.h2}
                            colour={TypographyColor.dark}
                        />
                        <p className='text-muted text-start fs-14'>
                            Explore the available list of regions in our platform. Our team is working on getting more regions unlocked for you!
                        </p>
                        <Button
							theme={ButtonTheme.secondary}
							size={ButtonSize.default}
							variant={ButtonVariant.contained}
							classname='h-2'
						>
							Next
						</Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default OverlayModal;
