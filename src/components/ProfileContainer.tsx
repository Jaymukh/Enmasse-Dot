import React from 'react';
import Header from './headercontainer/Header';
import AccountContainer from './accountcontainer/AccountContainer';

interface ProfileContainerProps {
  handleVisiblePanel: (index: number) => void;
  handleOverlay: (overlay: boolean) => void;
  handleHelp: (showHelp: number) => void;
}

const ProfileContainer: React.FC<ProfileContainerProps> = ({
  handleVisiblePanel,
  handleOverlay,
  handleHelp
}) => {
  return (
    <div className='w-100 primary-bg'>
      <Header
        handleVisiblePanel={handleVisiblePanel}
        handleOverlay={handleOverlay}
        handleHelp={handleHelp}
      />
      <AccountContainer
        handleVisiblePanel={handleVisiblePanel}
      />
    </div>
  );
};

export default ProfileContainer;
