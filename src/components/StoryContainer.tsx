import '../styles/main.css';
import Header from './headercontainer/Header';
import FamiliesSidePanel from './familyContainer/families/FamiliesSidePanel';
import FamiliesDetailsContainer from './familyContainer/families/FamiliesDetailsContainer';
import AccountHeader from './accountcontainer/AccountHeader';
import { useRecoilState } from 'recoil';
import { storiesState } from '../states';
import { useEffect, useState } from 'react';
import { RouteConstants } from '../constants';

const StoryContainer = () => {
    const [stories] = useRecoilState(storiesState);
    const [routeTo, setRouteTo] = useState<string>('');
    console.log(stories, routeTo)

    useEffect(() => {
        if(stories?.family && stories?.family[0] ) {
            const story = stories?.family[0];
            let routeValue = `${RouteConstants.root}?`
            if(story?.geoHierarchyLevel && story?.parent_id ) {
                routeValue = story?.geoHierarchyLevel === 2 ? routeValue + `country=${story?.parent_id[2]}` : routeValue + `country=${story?.parent_id[2]}&state=${story?.parent_id[1]}`;
            }
            setRouteTo(routeValue);
        }
    }, [stories?.family])

    return (
        <div className='w-100 primary-bg fixed-header'>
            <Header />
            <div className="w-100 z-index-0" style={{ height: '91.75vh', position: 'inherit' }}>
                <AccountHeader routeTo={routeTo} />
                <div className='row w-100' style={{ height: '86.25vh' }}>
                    <FamiliesSidePanel />
                    <FamiliesDetailsContainer />
                </div>
            </div>
        </div>
    );
};

export default StoryContainer;
