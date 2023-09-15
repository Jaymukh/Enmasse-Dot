import '../../App.css';
import React, { useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import WorkInProgressImage from '../../utils/images/work_in_progress.svg';

const MapYourBusiness = () => {
	const [open, setOpen] = useState(false);

	const toggleDrawer = (open: boolean) => {
		setOpen(open);
	};

	return (
		<div >
			<button
				className='btn btn-white mx-2'
				onClick={() => toggleDrawer(true)}
			>
				<FaMapMarkerAlt className='me-2' fontSize={20} />
				Map Your Business
			</button>
			<Drawer
				className='drawer'
				anchor='right'
				// hideBackdrop="true"
				// sx={{
				// 	width: 200,
				// }}
				style={{ width: '25vw' }}
				open={open}
				onClose={() => toggleDrawer(false)}
			>
				<Box
					className='d-flex flex-wrap justify-content-between mx-4 my-4'
					role='presentation'
				>
					<Typography variant='h6' className='drawer-header mx-4'>
						Map Your Business
					</Typography>
					<button
						className='close-btn'
						onClick={() => toggleDrawer(false)}
					>
						<MdClose fontSize={27} />
					</button>
				</Box>
				<div className='mx-5 my-1 dialog-div'>
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
