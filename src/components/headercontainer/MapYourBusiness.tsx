import '../../App.css';
import React, { useState } from 'react';
import { MdOutlineShareLocation } from 'react-icons/md';
import WorkInProgressImage from '../../utils/images/work_in_progress.svg';
import Drawer from '../ui/Drawer';

const MapYourBusiness = () => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = () => {
		setOpen(open);
	};

	return (
		<div >
			<button
				className='btn btn-white mx-2 fs-13'
				onClick={() => toggleDrawer()}
			>
				<MdOutlineShareLocation className='me-2' fontSize={20} color='#111827' />
				Map Your Business
			</button>
			<Drawer
				id='map-bussiness'
				title='Map Your Business'
				isOpen={open}
				toggleFunction={toggleDrawer}
			>
				<div className='mx-3 my-1 dialog-div'>
					<h6 className='contact-para fs-14'>
						Why do we need this?
					</h6>
					<p className='text-wrap fs-12 grey-para'>To plot your business and recommend the best opportunities for you.</p>
					<div className="d-flex flex-column justify-content-center align-items-center py-5">
						<img src={WorkInProgressImage} className="wip-img" alt="Work in progress" width="60%" />
						<h5 className="text-center fs-14 pt-5">Work in progress</h5>
						<p className="text-center fs-12 grey-para">Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.</p>
					</div>
				</div>
			</Drawer>
		</div>
	);
}

export default MapYourBusiness;
