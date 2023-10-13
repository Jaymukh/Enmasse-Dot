import '../../App.css';
import React, { useState } from 'react';
import Logo from '../../utils/images/Enmasse DOTS logo 1.png';
import { MdLiveHelp, MdNotifications } from 'react-icons/md';
import AccountOptions from './AccountOptions';
import RequestDetails from './RequestDetails';
import ExploreNow from './ExploreNow';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import WIPDrawer from '../mapContainer/WIPDrawer';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import { useSetRecoilState } from "recoil";
import { overlayState, showHelpState } from '../../states';


function Header() {
	const navigate = useNavigate();
	const setOverlay = useSetRecoilState(overlayState);
	const setShow = useSetRecoilState(showHelpState);
	const onLogoClick = () => {
		navigate(RouteConstants.root);
	}
	const handleHelpClick = () => {
		navigate(RouteConstants.root);
		setOverlay(true);
		setShow(1);
	}

	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');

	const closeWIPDrawer = () => {
		setOpen(false);
		setTitle('');
	};

	return (
		<div className="d-flex flex-wrap justify-content-between align-items-center border-bottom bg-white w-100" style={{ height: '8.25vh' }} >
			<div className="d-flex flex-wrap mx-3 align-items-center">
				<img src={Logo} alt="logo" onClick={onLogoClick} className='cursor-pointer' />
				{/* <h3 className='mx-3 enmasse-logo-font'>enmasse</h3>
				<div className='enmasse-circle'></div>
				<h6 className='enmasse-logo-font mx-3 mt-2'>D.O.T.S</h6> */}
			</div>
			<div className="d-flex flex-wrap justify-content-between align-items-center mx-4">
				<ExploreNow />
				<RequestDetails />
				<Button
					theme={ButtonTheme.primary}
					size={ButtonSize.default}
					variant={ButtonVariant.transparent}
					onClick={() => handleHelpClick()}
				>
					<MdLiveHelp fontSize={25} />
				</Button>
				<Button
					theme={ButtonTheme.primary}
					size={ButtonSize.default}
					variant={ButtonVariant.transparent}
					onClick={() => handleHelpClick()}
				>
					<MdNotifications fontSize={25} />
				</Button>
				<AccountOptions />
			</div>

			{open && <WIPDrawer open={open} title={title} closeWIPDrawer={closeWIPDrawer} />}

		</div>
	);
}

export default Header;
