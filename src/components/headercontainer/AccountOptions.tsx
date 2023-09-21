import React, { useState, useEffect } from 'react';
import '../../App.css';
import * as Constants from '../../utils/constants/Constants';
import { MdLogout } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { loggedUserState } from '../../states';
import { useRecoilValue } from 'recoil';
import { useUserService } from '../../services';
import { ButtonAvatar } from '../ui/button/ButtonAvatar';
import { Button, ButtonTheme, ButtonVariant } from '../ui/button/Button';

interface AccountMenuItem {
	key: number;
	text: string;
	icon: JSX.Element;
}

interface AccountOptionsProps {
	handleVisiblePanel: (index: number) => void;
}

const AccountOptions: React.FC<AccountOptionsProps> = ({ handleVisiblePanel }) => {

	const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
	const open = Boolean(anchorEl);
	const navigate = useNavigate();
	const userService = useUserService();
	const loggedUser = useRecoilValue(loggedUserState);

	useEffect(() => {
		userService.getUserDetails();
	}, []);

	const handleClick = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClickMenuItem = (event: React.MouseEvent<HTMLElement>, index: number) => {
		handleVisiblePanel(index);
		handleClose();
		navigate(RouteConstants.profile);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = () => {
		userService.logout();
		handleClose();
	}

	return (
		<div className='account-menu'>
			<ButtonAvatar
				onClick={handleClick}
				image=''
				initial={loggedUser.initial}
				bgColor={loggedUser.userHSL}
				classname='account-menu-button'
			/>
			<div>
				{open && (
					<div className='account-menu-dropdown py-1'>
						<Button theme={ButtonTheme.secondary} variant={ButtonVariant.transparent} className='menu-item d-flex flex-column' onClick={(event) => handleClickMenuItem(event, 0)}>
							<div className='me-3'>
								{loggedUser?.img ? (
									<img src={loggedUser?.img} alt="Avatar" className="img-fluid rounded-circle" />
								) : (
									<>{loggedUser.initial}</>
								)}

								<span>{loggedUser.name}</span>
							</div>
						</Button>
						{Constants.accountMenuItems.map((item) => (
							<Button theme={ButtonTheme.secondary} variant={ButtonVariant.transparent}
								key={item.key}
								className='menu-item d-flex'
								onClick={(event) => handleClickMenuItem(event, item.key)}
							>
								<div className='me-3'>{item.icon}
									<span>{item.text}</span>
								</div>
							</Button>
						))}
						<div className='divider'></div>
						<Button theme={ButtonTheme.secondary} variant={ButtonVariant.transparent} className='menu-item d-flex logout' onClick={handleLogout}>
							<MdLogout className='me-3' fontSize={22} />
							Logout
						</Button>
					</div>
				)
				}
			</div >
			{/* <div>
				<Menu
					anchorEl={anchorEl}
					id="account-menu"
					open={open}
					onClose={handleClose}
					onClick={handleClose}
					transformOrigin={{ horizontal: 'right', vertical: 'top' }}
					anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
					className='my-0 py-0'
				>
					<MenuItem onClick={(event) => handleClickMenuItem(event, 0)} className="menu-font-size" >
						<ListItemIcon>
							<Avatar
								sx={{ width: 28, height: 28, fontSize: 15 }}
							>
								{loggedUser?.initial}
							</Avatar>
						</ListItemIcon>
						{loggedUser.name}
					</MenuItem>
					{Constants.accountMenuItems.map((item: AccountMenuItem) => (
						<MenuItem key={item.key} onClick={(e) => handleClickMenuItem(e, item.key)} className="menu-font-size">
							<ListItemIcon>
								{item.icon}
							</ListItemIcon>
							{item.text}
						</MenuItem>
					))}
					<Divider className='my-0' />
					<MenuItem onClick={handleLogout} className="menu-font-size mb-0" >
						<ListItemIcon>
							<MdLogout fontSize={22} />
						</ListItemIcon>
						Logout
					</MenuItem>
				</Menu>
			</div> */}
		</div >
	);
}

export default AccountOptions;
