/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { MdLogout } from 'react-icons/md';
import { IoMdArrowDropdown } from "react-icons/io";

// CSS
import '../../styles/main.css';

// Components
import { Button, ButtonTheme, ButtonVariant, ButtonSize } from '../ui/button/Button';
import { Heading, TypographyColor, TypographyType } from '../ui/typography/Heading';
import { ButtonAvatar } from '../ui/button/ButtonAvatar';
import { AllSettingsState, UserSettingsState, errorState, loggedUserState, visiblePanelState } from '../../states';

// Utilities
import * as Constants from '../../utils/constants/Constants';
import { RouteConstants } from '../../constants';
import { useSettingsService, useUserService } from '../../services';
import { useMapHelpers } from '../../helpers';


const AccountOptions = () => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const navigate = useNavigate();
	const userService = useUserService();
	const settingsService = useSettingsService();
	const loggedUser = useRecoilValue(loggedUserState);
	const setSettings = useSetRecoilState(AllSettingsState);
	const setUserSettings = useSetRecoilState(UserSettingsState);
	const setVisiblePanel = useSetRecoilState(visiblePanelState);
	const { getErrorMsg } = useMapHelpers();

	const fetchUserSettings = () => {
		settingsService.getUserSettings().then((response) => {
			if (response) {
				setUserSettings(response);
				// setSpinner(false);
			}
		}).catch(error => {
			// setSpinner(false);
			getErrorMsg(error);

		});
	}

	const fetchAllSettings = () => {
		settingsService.getAllSettings().then((response) => {
			if (response) {
				setSettings(response);
			}
		}).catch(error => {
			getErrorMsg(error);
		});
	}

	useEffect(() => {
		userService.getUserDetails();
		fetchAllSettings();
		fetchUserSettings();
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (route: string) => {
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
			<div className='d-flex flex-row justify-content-center align-items-center' onClick={handleClick}>
				<ButtonAvatar
					image={loggedUser?.profile_picture}
					initial={loggedUser.initial}
					bgColor={!loggedUser?.profile_picture && loggedUser.userHSL}
					classname='margin-right-1'
				/>
				<IoMdArrowDropdown fontSize={22} className='margin-left-1 padding-left-right-0' color='rgba(28, 27, 31, 1)' />
			</div>

			{Boolean(anchorEl) &&
				(<ul className='account-menu-dropdown '>
					<li className='menu-item' onClick={() => handleClickMenuItem('profile')}>
						<ButtonAvatar
							image={loggedUser?.profile_picture}
							initial={loggedUser.initial}
							bgColor={!loggedUser?.profile_picture && loggedUser.userHSL}
							classname=''
							disabled={false}
						/>
						<Heading
							title={loggedUser.name}
							colour={TypographyColor.dark}
							type={TypographyType.h4}
							classname='text-start text-wrap padding-left-2 margin-0'
						/>
					</li>
					{Constants.accountMenuItems.map((item) => (
						(loggedUser.role === 'Admin' || item.key !== 2) && (
							<li
								key={item.key}
								className='menu-item d-flex fs-16'
								onClick={() => handleClickMenuItem((item.text)?.toLowerCase())}
							>
								<div className='padding-left-1'>{item.icon}</div>

								<Heading
									title={item.text}
									colour={TypographyColor.dark}
									type={TypographyType.h4}
									classname='text-start text-wrap padding-left-2 margin-0'
								/>
							</li>
						)
					))}
					<hr className='margin-0' />
					<Button theme={ButtonTheme.primary} size={ButtonSize.large} variant={ButtonVariant.transparent} classname='menu-item d-flex logout margin-top-bottom-1' onClick={handleLogout}>
						<MdLogout className='margin-right-3' fontSize={22} color='rgba(28, 27, 31, 1)' />
						Logout
					</Button>
				</ul>)
			}
		</div >
	);
}

export default AccountOptions;
