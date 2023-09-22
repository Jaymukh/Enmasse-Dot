import React, { useState, useEffect } from 'react';
import '../../App.css';
import * as Constants from '../../utils/constants/Constants';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { loggedUserState } from '../../states';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useUserService } from '../../services';
import { ButtonAvatar } from '../ui/button/ButtonAvatar';
import { Button, ButtonTheme, ButtonVariant, ButtonSize } from '../ui/button/Button';
import { visiblePanelState } from '../../states';


const AccountOptions = () => {

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const navigate = useNavigate();
	const userService = useUserService();
	const loggedUser = useRecoilValue(loggedUserState);
	const setVisiblePanel = useSetRecoilState(visiblePanelState);

	useEffect(() => {
		userService.getUserDetails();
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		Boolean(anchorEl) ? setAnchorEl(null) : setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>, route: string) => {
		setVisiblePanel(route);
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

	return (
		<div className='account-menu z-index-2'>
			<ButtonAvatar
				onClick={handleClick}
				image=''
				initial={loggedUser.initial}
				bgColor={loggedUser.userHSL}
				classname='account-menu-button'
			/>
			{Boolean(anchorEl) &&
				(<ul className='account-menu-dropdown z-index-2'>
					<li className='menu-item' onClick={(event) => handleClickMenuItem(event, 'profile')}>
						<ButtonAvatar
							image={loggedUser?.img}
							initial={loggedUser.initial}
							bgColor={loggedUser.userHSL}
							classname='account-menu-button'
							disabled={false}
						/>
						<span>{loggedUser.name}</span>
					</li>
					{Constants.accountMenuItems.map((item) => (
						<li
							key={item.key}
							className='menu-item d-flex'
							onClick={(event) => handleClickMenuItem(event, (item.text)?.toLowerCase())}
						>
							<div>{item.icon}</div>
							<span>{item.text}</span>
						</li>
					))}
					<hr className='m-0' />
					<Button theme={ButtonTheme.secondary} size={ButtonSize.large} variant={ButtonVariant.transparent} classname='menu-item d-flex logout my-1' onClick={handleLogout}>
						<MdLogout className='me-3' fontSize={22} />
						Logout
					</Button>
				</ul>)
			}

		</div >
	);
}

export default AccountOptions;
