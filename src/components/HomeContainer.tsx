import React from 'react';
import Header from './headercontainer/Header';
import MapContainer from './mapContainer/MapContainer';
import OverlayContainer from '../components/overlaycontainer/OverlayContainer';
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { overlayState } from '../states';

interface HomeContainerProps {
  handleVisiblePanel: (index: number) => void;
  handleOverlay: (overlay: boolean) => void;
  handleHelp: (showHelp: number) => void;
}

const HomeContainer: React.FC<HomeContainerProps> = ({
  handleVisiblePanel,
  handleOverlay,
  handleHelp,
}) => {
  const overlay = useRecoilValue(overlayState);

  return (
    <>
      <div className='w-100 primary-bg'>
        <Header
          handleVisiblePanel={handleVisiblePanel}
          handleOverlay={handleOverlay}
          handleHelp={handleHelp}
        />
        <MapContainer />
      </div>
      {overlay && (
        <div className='overlay d-flex flex-wrap justify-content-center align-items-center'>
          <OverlayContainer
            handleOverlay={handleOverlay}
            handleHelp={handleHelp}
          />
        </div>)
      }
    </>
  );
};

export default HomeContainer;