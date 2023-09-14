import '../../../styles/mapcontainer/mapoptions/Bookmarks.css';
import '../../../App.css'
import React from 'react';
import Drawer from '../../../ui/Drawer';
import WorkInProgressImage from '../../../utils/images/work_in_progress.svg';

interface WIPDrawerProps {
	open: boolean;
	title: string;
	closeWIPDrawer: () => void;
}

const WIPDrawer: React.FC<WIPDrawerProps> = ({ open, title, closeWIPDrawer }) => {

	return (
		<>
			<Drawer
				id='wip-drawer'
				title={title}
				isOpen={open}
				toggleFunction={closeWIPDrawer}
			>
				<div className='bookmark-div'>
					<div className="d-flex justify-content-center align-items-center mx-2 py-5">
						<div className="mx-4 my-1 dialog-div d-flex flex-column justify-content-center align-items-center py-5">
							<img src={WorkInProgressImage} className="wip-img" alt="Work in progress" width="60%" />
							<h5 className="text-center fs-14 pt-5">Work in progress.</h5>
							<p className="text-center fs-12">Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.</p>
						</div>
					</div>
				</div>
			</Drawer>
		</>
	);
}

export default WIPDrawer;
