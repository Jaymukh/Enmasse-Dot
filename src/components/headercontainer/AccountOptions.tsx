/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import '../../App.css';
import * as Constants from '../../utils/constants/Constants';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { loggedUserState } from '../../states';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSettingsService, useUserService } from '../../services';
import { ButtonAvatar } from '../ui/button/ButtonAvatar';
import { Button, ButtonTheme, ButtonVariant, ButtonSize } from '../ui/button/Button';
import { visiblePanelState } from '../../states';


const AccountOptions = () => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const navigate = useNavigate();
	const userService = useUserService();
	const settingsService = useSettingsService();
	const loggedUser = useRecoilValue(loggedUserState);
	const setVisiblePanel = useSetRecoilState(visiblePanelState);

	useEffect(() => {
		userService.getUserDetails();
		// settingsService.getAllSettings();
		// settingsService.getUserSettings();
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>, route: string) => {
		setVisiblePanel('/' + route);
		handleClose();
		navigate(RouteConstants[route]);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		userService.logout();
		handleClose();
	}

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
		<div className='account-menu' ref={menuRef}>
			<ButtonAvatar
				onClick={handleClick}
				image={loggedUser?.profile_picture}
				initial={loggedUser.initial}
				bgColor={!loggedUser?.profile_picture && loggedUser.userHSL}
				classname=''
			/>
			{Boolean(anchorEl) &&
				(<ul className='account-menu-dropdown '>
					<li className='menu-item fs-16' onClick={(event) => handleClickMenuItem(event, 'profile')}>
						<ButtonAvatar
							image={loggedUser?.profile_picture}
							initial={loggedUser.initial}
							bgColor={!loggedUser?.profile_picture && loggedUser.userHSL}
							classname=''
							disabled={false}
						/>
						<span className='text-wrap'>{loggedUser.name}</span>
					</li>
					{Constants.accountMenuItems.map((item) => (
						(loggedUser.role === 'Admin' || item.key !== 2) && (
							<li
								key={item.key}
								className='menu-item d-flex fs-16'
								onClick={(event) => handleClickMenuItem(event, (item.text)?.toLowerCase())}
							>
								<div>{item.icon}</div>
								<span>{item.text}</span>
							</li>)
					))}
					<hr className='m-0' />
					<Button theme={ButtonTheme.primary} size={ButtonSize.large} variant={ButtonVariant.transparent} classname='menu-item d-flex logout my-1' onClick={handleLogout}>
						<MdLogout className='me-3' fontSize={22} />
						Logout
					</Button>
				</ul>)
			}
		</div >
	);
}

export default AccountOptions;
