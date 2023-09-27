import React from 'react';
import Header from './headercontainer/Header';
import DashBoard from './dashboardcontainer/DashBoard';
import AccountHeader from './accountcontainer/AccountHeader';

const DashBoardContainer = () => {
	return (
		<div className='w-100 h-100 primary-bg'>
			<Header />
			<div className='fixed-top header2'>
				<AccountHeader />
				<DashBoard />
			</div>
		</div>
	);
};

export default DashBoardContainer;
