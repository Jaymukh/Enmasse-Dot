// CSS
import '../styles/main.css';

// Components
import Header from '../components/headercontainer/Header';
import DashBoard from '../components/dashboardcontainer/DashBoard';
import AccountHeader from '../components/accountcontainer/AccountHeader';


const DashBoardContainer = () => {
	return (
		<div className='w-100 h-100 primary-bg fixed-header'>
			<Header />
			<div style={{ position: 'inherit' }}>
				<AccountHeader />
				<DashBoard />
			</div>
		</div>
	);
};

export default DashBoardContainer;
