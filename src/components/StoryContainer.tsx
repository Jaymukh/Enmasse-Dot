import Header from './headercontainer/Header';
import FamilyContainer from './familyContainer/FamilyContainer';

const StoryDetailsContainer = () => {
    return (
        <div className='w-100 primary-bg fixed-header'>
            <Header />
            <FamilyContainer />
        </div>
    );
};

export default StoryDetailsContainer;
