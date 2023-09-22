import React from 'react';
import Header from './headercontainer/Header';
import DashBoard from './dashboardcontainer/DashBoard';

const DashBoardContainer = () => {
	return (
		<div className='w-100 primary-bg'>
			<Header
			/>
			<DashBoard />
		</div>
	);
};

export default DashBoardContainer;
