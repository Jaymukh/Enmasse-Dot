import React from 'react';
import Header from './headercontainer/Header';
import MapContainer from './mapcontainer/MapContainer';
import OverlayContainer from '../components/overlaycontainer/OverlayContainer';

interface HomeContainerProps {
  handleVisiblePanel: (index: number) => void;
  handleOverlay: (overlay: boolean) => void;
  handleInfographic: (showInfographic: number) => void;
  overlay: boolean;
  showInfographic: number;
}

const HomeContainer: React.FC<HomeContainerProps> = ({
  handleVisiblePanel,
  handleOverlay,
  handleInfographic,
  overlay,
  showInfographic,
}) => {
  return (
    <>
      <div className='w-100 primary-bg'>
        <Header
          handleVisiblePanel={handleVisiblePanel}
          handleOverlay={handleOverlay}
          handleInfographic={handleInfographic}
        />
        <MapContainer />
      </div>
      {overlay ? (
        <div className='overlay d-flex flex-wrap justify-content-center align-items-center'>
          <OverlayContainer
            handleOverlay={handleOverlay}
            handleInfographic={handleInfographic}
            showInfographic={showInfographic}
          />
        </div>
      ) : (
        ''
      )}
    </>
  );
};

export default HomeContainer;