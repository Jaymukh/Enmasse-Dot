import React from 'react';
import Profile from './profile/Profile';
import Settings from './settings/Settings';
import Invite from './invite/Invite';

interface DetailsContainerProps {
    visiblePanel: number;
}

const DetailsContainer: React.FC<DetailsContainerProps> = ({ visiblePanel }) => {
    return (
        <div className='col-9 h-100'>
            {visiblePanel === 0 ? <Profile /> : visiblePanel === 1 ? <Settings /> : <Invite />}
        </div>
    );
}

export default DetailsContainer;
