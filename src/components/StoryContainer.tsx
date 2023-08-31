import React from 'react';
import Header from './headercontainer/Header';
import FamilyContainer from './familyContainer/FamilyContainer';
interface StoryContainerProps {
  handleVisiblePanel: (index: number) => void;
  handleOverlay: (overlay: boolean) => void;
  handleInfographic: (showInfographic: number) => void; 
}

const StoryContainer: React.FC<StoryContainerProps> = ({ handleVisiblePanel, handleOverlay, handleInfographic }) => {
  return (
    <div className='w-100 primary-bg'>
      <Header handleVisiblePanel={handleVisiblePanel} handleOverlay={handleOverlay} handleInfographic={handleInfographic} />
      <FamilyContainer />
    </div>
  );
};

export default StoryContainer;
