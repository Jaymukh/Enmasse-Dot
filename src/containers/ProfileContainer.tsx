// CSS
import '../styles/main.css';

// Components
import Header from '../components/headercontainer/Header';
import AccountHeader from '../components/accountcontainer/AccountHeader';
import Account from '../components/accountcontainer/account/Account';

// Utilities
import { RouteConstants } from '../constants';

const ProfileContainer = () => {
	return (
		<div className='w-100 primary-bg fixed-header'>
			<Header />
			<div className="w-100 m-0 z-index-0" style={{ height: '91.75vh', position: 'inherit' }}>
				<AccountHeader routeTo={`${RouteConstants.root}?country=1`} />
				<Account />
			</div>
		</div>
	);
};

export default ProfileContainer;
