import React from 'react';
import Header from './headercontainer/Header';
import AccountHeader from './accountcontainer/AccountHeader';
import Account from './accountcontainer/account/Account';

const ProfileContainer = () => {
	return (
		<div className='w-100 primary-bg'>
			<Header	/>
			<div className="row w-100 h-90 fixed-bottom m-0 border-top z-index-0" style={{ height: '88.5vh', position: 'inherit' }}>
				<AccountHeader />
				<Account />
			</div>
		</div>
	);
};

export default ProfileContainer;
