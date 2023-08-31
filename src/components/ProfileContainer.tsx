import React from 'react';
import Header from './headercontainer/Header';
import AccountContainer from './accountcontainer/AccountContainer';

interface ProfileContainerProps {
  handleVisiblePanel: (index: number) => void;
  handleOverlay: (overlay: boolean) => void;
  handleInfographic: (showInfographic: number) => void;
  visiblePanel: number;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  handleVisiblePanel,
  handleOverlay,
  handleInfographic,
  visiblePanel,
}) => {
  return (
    <div className='w-100 primary-bg'>
      <Header
        handleVisiblePanel={handleVisiblePanel}
        handleOverlay={handleOverlay}
        handleInfographic={handleInfographic}
      />
      <AccountContainer
        handleVisiblePanel={handleVisiblePanel}
        visiblePanel={visiblePanel}
      />
    </div>
  );
};

export default ProfileContainer;
