import '../styles/main.css';
import Header from './headercontainer/Header';
import DashBoard from './dashboardcontainer/DashBoard';
import AccountHeader from './accountcontainer/AccountHeader';

const DashBoardContainer = () => {
	return (
		<div className='w-100 h-100 primary-bg fixed-header'>
			<Header />
			<div style={{position: 'inherit'}}>
				<AccountHeader />
				<DashBoard />
			</div>
		</div>
	);
};

export default DashBoardContainer;
