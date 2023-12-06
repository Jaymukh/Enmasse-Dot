/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, useRef } from 'react';
import '../../styles/main.css';
import * as Constants from '../../utils/constants/Constants';
import { MdLogout } from 'react-icons/md';
import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { AllSettingsState, UserSettingsState, errorState, loggedUserState } from '../../states';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useSettingsService, useUserService } from '../../services';
import { ButtonAvatar } from '../ui/button/ButtonAvatar';
import { Button, ButtonTheme, ButtonVariant, ButtonSize } from '../ui/button/Button';
import Body, { BodyColor, BodyType } from '../ui/typography/Body';
import { visiblePanelState } from '../../states';


const AccountOptions = () => {
	const menuRef = useRef<HTMLDivElement | null>(null);
	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const navigate = useNavigate();
	const userService = useUserService();
	const settingsService = useSettingsService();
	const loggedUser = useRecoilValue(loggedUserState);
	const setSettings = useSetRecoilState(AllSettingsState);
    const setUserSettings = useSetRecoilState(UserSettingsState);
    const setError = useSetRecoilState(errorState);
	const setVisiblePanel = useSetRecoilState(visiblePanelState);

	const fetchUserSettings = () => {
		settingsService.getUserSettings().then((response) => {
			if (response) {
				setUserSettings(response);
				// setSpinner(false);
			}
		}).catch(error => {
			// setSpinner(false);
			const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
			setError({ type: 'Error', message: errorMsg });

		});
	}

	const fetchAllSettings = () => {
		settingsService.getAllSettings().then((response) => {
			if (response) {
				setSettings(response);
			}
		}).catch(error => {
			const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
			setError({ type: 'Error', message: errorMsg });
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
			<div className='d-flex flex-row justify-content-center align-items-center' onClick={handleClick}>
				<ButtonAvatar
					image={loggedUser?.profile_picture}
					initial={loggedUser.initial}
					bgColor={!loggedUser?.profile_picture && loggedUser.userHSL}
					classname=''
				/>
				<IoMdArrowDropdown fontSize={22} className='ms-1 px-0' color='rgba(28, 27, 31, 1)' />
			</div>

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
						<Body
							color={BodyColor.dark}
							type={BodyType.p1}
							classname='text-wrap text-start'
						>
							{loggedUser.name}
						</Body>

					</li>
					{Constants.accountMenuItems.map((item) => (
						(loggedUser.role === 'Admin' || item.key !== 2) && (
							<li
								key={item.key}
								className='menu-item d-flex fs-16'
								onClick={(event) => handleClickMenuItem(event, (item.text)?.toLowerCase())}
							>
								<div>{item.icon}</div>
								<Body
									color={BodyColor.dark}
									type={BodyType.p1}
									classname=''
								>
									{item.text}
								</Body>
							</li>
						)
					))}
					<hr className='m-0' />
					<Button theme={ButtonTheme.primary} size={ButtonSize.large} variant={ButtonVariant.transparent} classname='menu-item d-flex logout my-1' onClick={handleLogout}>
						<MdLogout className='me-3' fontSize={22} color='rgba(28, 27, 31, 1)' />
						Logout
					</Button>
				</ul>)
			}
		</div >
	);
}

export default AccountOptions;
