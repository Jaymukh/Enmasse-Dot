import React from 'react';
import Header from './headercontainer/Header';
import DashBoard from './dashboardcontainer/DashBoard';
import AccountHeader from './accountcontainer/AccountHeader';

const DashBoardContainer = () => {
	return (
		<div className='w-100 h-100 primary-bg'>
			<Header />
			<AccountHeader />
			<DashBoard />
		</div>
	);
};

export default DashBoardContainer;
