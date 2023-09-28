import React from 'react';
import Header from './headercontainer/Header';
import FamilyContainer from './familyContainer/FamilyContainer';

const StoryContainer = () => {
    return (
        <div className='w-100 primary-bg fixed-header'>
            <Header />
            <FamilyContainer />
        </div>
    );
};

export default StoryContainer;
