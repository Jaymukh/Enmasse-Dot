/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import '../../../App.css';
import { MdHelpCenter } from 'react-icons/md';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../../ui/button/Button';
import * as Constants from '../../../utils/constants/Constants';
import { overlayState, helpState } from '../../../states';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useUserService } from '../../../services';
import ContactUs from './ContactUs';
import OverlayModal from './OverlayModal';
import WIPDrawer from '../../mapContainer/WIPDrawer';

const HelpOptions = () => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const userService = useUserService();
	const [overlay, setOverlay] = useRecoilState(overlayState);
	const setShow = useSetRecoilState(helpState);
	const [contactUsDrawerOpen, setContactUsDrawerOpen] = useState(false);
	const [roadmapDrawerOpen, setRoadmapDrawerOpen] = useState(false);
	const [text, setText] = useState('');

	const closeWIPDrawer = () => {
		setRoadmapDrawerOpen(false);
		setText('');
	};

	const openWIPDrawer = (title: string) => {
		setText(title);
		setRoadmapDrawerOpen(true);
	}

	const handleContactUsDrawer = (contactUsDrawerOpen: boolean) => {
		setContactUsDrawerOpen(contactUsDrawerOpen);
	};
	const handleHelpClick = () => {
		setOverlay(true);
		setShow(1);
	};

	useEffect(() => {
		userService.getUserDetails();
	}, []);

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
				openWIPDrawer('Roadmap');
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
				classname='ps-4 pe-0'
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
							<span>{item.text}</span>
						</li>
					))}
				</ul>)
			}
			{/* drawer for contact us */}
			{contactUsDrawerOpen && (<ContactUs contactUsDrawerOpen={contactUsDrawerOpen} handleContactUsDrawer={handleContactUsDrawer} />)}

			{/* drawer for roadmap */}
			{roadmapDrawerOpen && <WIPDrawer open={roadmapDrawerOpen} title={text} closeWIPDrawer={closeWIPDrawer} />}

			{/* drawer for Help */}
			{overlay && <OverlayModal />}
		</div >
	);
}

export default HelpOptions;
