import '../../../styles/mapcontainer/mapoptions/Bookmarks.css';
import '../../../App.css'
import React from 'react';
import { MdClose } from 'react-icons/md';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
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
				anchor='right'
				open={open}
				onClose={() => closeWIPDrawer()}
			>
				<div className='bookmark-div'>
					<Box className='d-flex flex-wrap justify-content-between mx-3 my-4'>
						<Typography variant='h6' className='drawer-header'>
							{title}
						</Typography>
						<button
							className='close-btn btn-white'
							onClick={() => closeWIPDrawer()}
						>
							<MdClose fontSize={27} />
						</button>
					</Box>
					<Box
						sx={{
							width: 440,
						}}
						role='presentation'
						onClick={() => closeWIPDrawer()}
						onKeyDown={() => closeWIPDrawer()}
					>
						<div className="d-flex justify-content-center p-5 mt-6">
							<div className="mt-6" style={{ width: '18rem' }}>
								<img src={WorkInProgressImage} className="card-img-top" alt="Image" width="100%" />
								<div className="card-body">
									<h5 className="card-title">Work in progress</h5>
									<p className="card-text">Our team is actively developing these features for the upcoming updates. Keep an eye out for more information.</p>
								</div>
							</div>
						</div>
					</Box>
				</div>
			</Drawer>
		</>
	);
}

export default WIPDrawer;
