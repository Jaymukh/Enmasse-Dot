import React from 'react';
import Header from './headercontainer/Header';
import DashBoard from './dashboardcontainer/DashBoard';
import AccountHeader from './accountcontainer/AccountHeader';

const DashBoardContainer = () => {
	return (
		<div className='w-100 h-100 primary-bg fixed-top'>
			<Header />
			<div className='fixed-header header2' style={{position: 'inherit'}}>
				<AccountHeader />
				<DashBoard />
			</div>
		</div>
	);
};

export default DashBoardContainer;
