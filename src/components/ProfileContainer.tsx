import React from 'react';
import Header from './headercontainer/Header';
import AccountContainer from './accountcontainer/AccountContainer';
import AccountHeader from './accountcontainer/AccountHeader';
import Account from './accountcontainer/account/Account';

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
      {/* <AccountContainer
        handleVisiblePanel={handleVisiblePanel}
      /> */}
      <div className="row w-100 h-90 fixed-bottom m-0 border-top z-index-0" style={{ height: '88.5vh', position: 'inherit' }}>
            <AccountHeader />
            <Account handleVisiblePanel={handleVisiblePanel} />
        </div>
    </div>
  );
};

export default ProfileContainer;
