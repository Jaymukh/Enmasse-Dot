/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useState, useEffect, useRef } from 'react';
import { MdHelpCenter } from 'react-icons/md';
import { useRecoilState, useSetRecoilState } from 'recoil';

// CSS
import '../../../styles/main.css';

// Components
import WIPDrawer from '../../mapContainer/WIPDrawer';
import ContactUs from './ContactUs';
import OverlayModal from './OverlayModal';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import Body, { BodyColor, BodyType } from '../../ui/typography/Body';
import { overlayState, helpState } from '../../../states';

// Utilities
import * as Constants from '../../../utils/constants/Constants';
import RoadmapModal from './RoadmapModal';
import RoadmapContact from './RoadmapContact';


const HelpOptions = () => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const [overlay, setOverlay] = useRecoilState(overlayState);
	const setShow = useSetRecoilState(helpState);
	const [contactUsDrawerOpen, setContactUsDrawerOpen] = useState(false);
	// const [roadmapDrawerOpen, setRoadmapDrawerOpen] = useState(false);	
	const [roadmapContactDrawerOpen, setRoadmapContactDrawerOpen] = useState(false);

    const [openRoadmapModal, setOpenRoadmapModal] = useState(false);
	const [showRoadmap, setShowRoadmap] = useState(1);
	const [text, setText] = useState('');

	// const closeWIPDrawer = () => {
	// 	setRoadmapDrawerOpen(false);
	// 	setText('');
	// };

	// const openWIPDrawer = (title: string) => {
	// 	setText(title);
	// 	setRoadmapDrawerOpen(true);
	// }

	const handleRoadmapContactDrawer = (roadmapContactDrawerOpen: boolean) => {
		setRoadmapContactDrawerOpen(roadmapContactDrawerOpen);
	};
	const handleContactUsDrawer = (contactUsDrawerOpen: boolean) => {
		setContactUsDrawerOpen(contactUsDrawerOpen);
	};
	const handleHelpClick = () => {
		setOverlay(true);
		setShow(1);
	};

	const handleRoadmapClick = (openRoadmapModal: boolean) => {
		setOpenRoadmapModal(openRoadmapModal);
		setShowRoadmap(1);
	};

	const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
		Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (key: number) => {
		switch (key) {
			case 1:
				handleContactUsDrawer(true);
				break;
			case 2:
				handleHelpClick();
				break;
			case 3:
				handleRoadmapClick(true);
				break;
		}
		handleClose();
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleClickOutside = (event: { target: any; }) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			handleClose();
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='help-menu' ref={menuRef}>
			<Button
				theme={ButtonTheme.primary}
				size={ButtonSize.small}
				variant={ButtonVariant.transparent}
				onClick={(e) => handleMenuClick(e)}
				classname='p-0 ms-4'
			>
				<MdHelpCenter fontSize={25} />
			</Button>
			{Boolean(anchorEl) &&
				(<ul className='help-menu-dropdown '>
					{Constants.helpMenuItems.map((item) => (
						<li
							key={item.key}
							className='help-menu-item d-flex fs-16'
							onClick={() => handleClickMenuItem(item.key)}
						>
							<div>{item.icon}</div>
							<Body
								type={BodyType.p2}
								color={BodyColor.dark}
							>{item.text}</Body>
						</li>
					))}
				</ul>)
			}
			{/* drawer for contact us */}
			{contactUsDrawerOpen && (<ContactUs contactUsDrawerOpen={contactUsDrawerOpen} handleContactUsDrawer={handleContactUsDrawer} />)}

			{/* drawer for roadmap */}
			{/* {roadmapDrawerOpen && <WIPDrawer open={roadmapDrawerOpen} title={text} closeWIPDrawer={closeWIPDrawer} />} */}

			{/* modal for Help */}
			{overlay && <OverlayModal handleContactUsDrawer={handleContactUsDrawer} />}

			{/* modal for Roadmap */}
			{openRoadmapModal && <RoadmapModal showRoadmap={showRoadmap} setShowRoadmap={setShowRoadmap} openRoadmapModal={openRoadmapModal} setOpenRoadmapModal={setOpenRoadmapModal} handleRoadmapClick={handleRoadmapClick} handleRoadmapContactDrawer={handleRoadmapContactDrawer}  />}

			{/* Roadmap Contact drawer */}
			{roadmapContactDrawerOpen && (<RoadmapContact roadmapContactDrawerOpen={roadmapContactDrawerOpen} handleRoadmapContactDrawer={handleRoadmapContactDrawer} />)}
		</div >
	);
}

export default HelpOptions;
