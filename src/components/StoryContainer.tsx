import '../styles/main.css';
import Header from './headercontainer/Header';
import FamiliesSidePanel from './familyContainer/families/FamiliesSidePanel';
import FamiliesDetailsContainer from './familyContainer/families/FamiliesDetailsContainer';
import AccountHeader from './accountcontainer/AccountHeader';

const StoryContainer = () => {

    return (
        <div className='w-100 primary-bg fixed-header'>
            <Header />
            <div className="w-100 z-index-0" style={{ height: '91.75vh', position: 'inherit' }}>
                <AccountHeader />
                <div className='row w-100' style={{ height: '86.25vh' }}>
                    <FamiliesSidePanel />
                    <FamiliesDetailsContainer />
                </div>
            </div>
        </div>
    );
};

export default StoryContainer;
