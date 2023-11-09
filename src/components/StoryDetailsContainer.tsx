import Header from './headercontainer/Header';
import FamilyHeader from './familyContainer/FamilyHeader';
import Family from './familyContainer/family/Family';

const StoryDetailsContainer = () => {
    return (
        <div className='w-100 primary-bg fixed-header'>
            <Header />
            <div className="w-100 z-index-0" style={{ height: '91.75vh', position: 'inherit' }}>
                <FamilyHeader />
                <Family />
            </div>
        </div>
    );
};

export default StoryDetailsContainer;
