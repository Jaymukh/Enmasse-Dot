import React from 'react';
import Header from './headercontainer/Header';
import FamilyContainer from './familyContainer/FamilyContainer';
interface StoryContainerProps {
    handleVisiblePanel: (index: number) => void;
    handleOverlay: (overlay: boolean) => void;
    handleHelp: (showHelp: number) => void;
}

const StoryContainer: React.FC<StoryContainerProps> = ({ handleVisiblePanel, handleOverlay, handleHelp }) => {
    return (
        <div className='w-100 primary-bg'>
            <Header
                handleVisiblePanel={handleVisiblePanel}
                handleOverlay={handleOverlay}
                handleHelp={handleHelp}
            />
            <FamilyContainer />
        </div>
    );
};

export default StoryContainer;
