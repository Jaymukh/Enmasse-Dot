import Header from './headercontainer/Header';
import FamilyContainer from './familyContainer/FamilyContainer';
import FamilyHeader from './familyContainer/FamilyHeader';
import Family from './familyContainer/family/Family';
import Families from './familyContainer/families/Families';
import { RouteConstants } from '../constants';

const StoryDetailsContainer = () => {
    return (
        <div className='w-100 primary-bg fixed-header'>
            {/* <Header />
            <div className="w-100 z-index-0 header2" style={{ height: '91.75vh', position: 'inherit' }}>
                <FamilyHeader route={RouteConstants.stories} />
                <Family />
            </div> */}
        </div>
    );
};

export default StoryDetailsContainer;
