import '../../../styles/mapcontainer/mapoptions/Filters.css';
import React, { useState } from 'react';
import { IoMdOptions } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';

function Filters() {
	const [open, setOpen] = useState(false);
	// const [tabValue, setTabValue] = useState('1');

	const toggleDrawer = (open) => {
		setOpen(open);
	};

	// const handleChange = (event, newValue) => {
	// 	setTabValue(newValue);
	// };

	// var tabList = [
	// 	{
	// 		label: 'Domain Filters',
	// 		value: 1,
	// 	},
	// 	{
	// 		label: 'Cohort Filters',
	// 		value: 2,
	// 	},
	// ];
	return (
		<div className='Filters'>
			<button
				className='subheader-btn mx-1'
				onClick={() => toggleDrawer(true)}
			>
				<div className='d-flex flex-wrap'>
					<IoMdOptions className='mt-1' />
					<p className='mx-2'>Filters</p>
				</div>
			</button>
			<Drawer
				anchor='right'
				// hideBackdrop="true"
				open={open}
				onClose={() => toggleDrawer(false)}
			>
				<div className='bookmark-div'>
					<Box className='d-flex flex-wrap justify-content-between mx-3 my-4'>
						<Typography variant='h6' className='drawer-header'>
							Filters
						</Typography>
						<button
							className='close-btn'
							onClick={() => toggleDrawer(false)}
						>
							<MdClose fontSize={27} />
						</button>
					</Box>
					{/* <Box sx={{ width: '100%', typography: 'body1' }}>
						<Tab value={tabValue}>
							<Box
								sx={{ borderBottom: 1, borderColor: 'divider' }}
							>
								<Tabs
									onChange={handleChange}
									aria-label='lab API tabs example'
								>
									{tabList.map((tab) => (
										<Tab
											label={tab.label}
											value={tab.value}
										/>
									))}
								</Tabs>
							</Box>
							
						</Tab>
					</Box> */}
				</div>
			</Drawer>
		</div>
	);
}

export default Filters;
