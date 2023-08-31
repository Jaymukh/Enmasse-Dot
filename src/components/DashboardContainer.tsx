import React from 'react';
import Header from './headercontainer/Header';
import DashBoard from './dashboardcontainer/DashBoard';

interface DashBoardContainerProps {
  handleVisiblePanel: (index: number) => void;
  handleOverlay: (overlay: boolean) => void;
  handleInfographic: (showInfographic: number) => void;
}

const DashBoardContainer: React.FC<DashBoardContainerProps> = ({
  handleVisiblePanel,
  handleOverlay,
  handleInfographic,
}) => {
  return (
    <div className='w-100 primary-bg'>
      <Header
        handleVisiblePanel={handleVisiblePanel}
        handleOverlay={handleOverlay}
        handleInfographic={handleInfographic}
      />
      <DashBoard />
    </div>
  );
};

export default DashBoardContainer;
