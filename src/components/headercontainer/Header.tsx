import '../../styles/main.css';
import React, { useState } from 'react';
import Logo from '../../utils/images/Enmasse DOTS logo 1.png';
import { BsFillBookmarksFill } from 'react-icons/bs';
import AccountOptions from './AccountOptions';
import ExploreNow from './ExploreNow';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import WIPDrawer from '../mapContainer/WIPDrawer';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';
import HelpOptions from './helpcontainer/HelpOptions';


function Header() {
	const navigate = useNavigate();
	const onLogoClick = () => {
		navigate(`${RouteConstants.root}?country=1`);
	}
	

	const [open, setOpen] = useState(false);
	const [text, setText] = useState<{title: string, description: string}>({title: '', description: ''});
	const bookmarkDescription = 'Bookmarks can help you revisit your maps of interest and help you compare with other maps for quicker analysis!'

	const closeWIPDrawer = () => {
		setOpen(false);
		setText({title: '', description: ''});
	};

	const handleDrawer = (title: string) => {
		setText({title: title, description: bookmarkDescription});
		setOpen(true);
	}

	return (
		<div className="d-flex flex-wrap justify-content-between align-items-center border-bottom bg-white w-100" style={{ height: '8.25vh' }} >
			<div className="d-flex flex-wrap mx-3 align-items-center">
				<img src={Logo} alt="logo" onClick={onLogoClick} className='cursor-pointer' />
			</div>
			<div className="d-flex flex-wrap justify-content-between align-items-center mx-4">
				<ExploreNow />
				{/* <RequestDetails /> */}
				{/* <Button
					theme={ButtonTheme.primary}
					size={ButtonSize.small}
					variant={ButtonVariant.transparent}
					onClick={() => handleHelpClick()}
					classname='ps-4 pe-0'
				>
					<MdHelpCenter fontSize={25} />
				</Button> */}
				<HelpOptions  />
				<Button
					theme={ButtonTheme.primary}
					size={ButtonSize.small}
					variant={ButtonVariant.transparent}
					onClick={() => handleDrawer('Add Bookmark')}
					classname='px-0 mx-4'
				>
					<BsFillBookmarksFill fontSize={20} className='iconNextPrev' />
				</Button>
				<AccountOptions />
			</div>

			{open && <WIPDrawer open={open} title={text.title} description={text.description} closeWIPDrawer={closeWIPDrawer} />}

		</div>
	);
}

export default Header;
