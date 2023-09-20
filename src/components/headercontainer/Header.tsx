import '../../App.css';
import React, { useState } from 'react';
import { MdLiveHelp, MdNotifications } from 'react-icons/md';
import AccountOptions from './AccountOptions';
import MapYourBusiness from './MapYourBusiness';
import ExploreNow from './ExploreNow';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants/routeConstants';
import WIPDrawer from '../mapContainer/mapOptions/WIPDrawer';
import { Button, ButtonTheme, ButtonSize, ButtonVariant } from '../ui/button/Button';

interface HeaderProps {
  handleVisiblePanel: (index: number) => void;
  handleOverlay: (overlay: boolean) => void;
  handleHelp: (showHelp: number) => void;
}

function Header({ handleVisiblePanel, handleOverlay, handleHelp }: HeaderProps) {

  const navigate = useNavigate();
  const handleHelpClick = () => {
    navigate(RouteConstants.root);
    handleOverlay(true);
    handleHelp(1);
  }

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const openWIPDrawer = (title: string) => {
    setOpen(true);
    setTitle(title);
  };

  const closeWIPDrawer = () => {
    setOpen(false);
    setTitle('');
  };

  return (
    <div className="d-flex flex-wrap justify-content-between border-bottom bg-white py-3 my-0 w-100" style={{ height: '11.5vh' }} >
      <div className="d-flex flex-wrap justify-content-between">
        <div className="d-flex flex-wrap mx-3 align-items-center">
          <h3 className='mx-3 enmasse-logo-font'>enmasse</h3>
          <div className='enmasse-circle'></div>
          <h6 className='enmasse-logo-font mx-3 mt-2'>D.O.T.S</h6>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-between align-items-center mx-4">
        <ExploreNow />
        <MapYourBusiness />
        {/* <button className='border-0 btn-white' onClick={() => handleHelpClick()} >
          <MdLiveHelp fontSize={25} className='ms-4 me-3 mb-1 header-icon' />
        </button> */}
        <Button
          theme={ButtonTheme.secondary}
          size={ButtonSize.default}
          variant={ButtonVariant.transparent}
          onClick={() => handleHelpClick()}
        >
          <MdLiveHelp fontSize={25} />
        </Button>
        {/* <button className='border-0 btn-white' onClick={() => openWIPDrawer("Notifications")}>
          <MdNotifications fontSize={25} className='mb-1 header-icon' />
        </button> */}
        <Button
          theme={ButtonTheme.secondary}
          size={ButtonSize.default}
          variant={ButtonVariant.transparent}
          onClick={() => handleHelpClick()}
        >
          <MdNotifications fontSize={25} />
        </Button>
        <AccountOptions handleVisiblePanel={handleVisiblePanel} />
      </div>

      {open && <WIPDrawer open={open} title={title} closeWIPDrawer={closeWIPDrawer} />}

    </div>
  );
}

export default Header;
