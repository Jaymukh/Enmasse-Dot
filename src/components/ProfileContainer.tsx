import '../App.css';
import Header from './headercontainer/Header';
import AccountHeader from './accountcontainer/AccountHeader';
import Account from './accountcontainer/account/Account';

const ProfileContainer = () => {
	return (
		<div className='w-100 primary-bg fixed-header'>
			<Header	/>
			<div className="w-100 m-0 z-index-0" style={{ height: '91.75vh', position: 'inherit' }}>
				<AccountHeader />
				<Account />
			</div>
		</div>
	);
};

export default ProfileContainer;
