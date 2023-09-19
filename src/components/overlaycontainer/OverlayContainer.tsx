import React from 'react';
import '../../App.css';
import LandingPage from './LandingPage';
import EHInfographic from './EHInfographic';
import ISPInfographic from './ISPInfographic';
import TAMInfographic from './TAMInfographic';
import { useRecoilValue } from "recoil";
import { showHelpState } from '../../states';

interface OverlayContainerProps {
  handleOverlay: (overlay: boolean) => void;
  handleHelp: (showHelp: number) => void;
}

const OverlayContainer: React.FC<OverlayContainerProps> = ({ 
  handleOverlay, 
  handleHelp 
}) => {

  const showHelp = useRecoilValue(showHelpState );

  return (
    <div className='OverlayContainer'>
			{(showHelp === 0) &&
				<LandingPage handleHelp={handleHelp} handleOverlay={handleOverlay} />}
			{(showHelp === 1) &&
				<EHInfographic handleHelp={handleHelp} handleOverlay={handleOverlay} />}
			{(showHelp === 2)  &&
				<ISPInfographic handleHelp={handleHelp} handleOverlay={handleOverlay} />}
			{(showHelp === 3)  &&
				<TAMInfographic handleOverlay={handleOverlay} />}
		</div>
  );
}

export default OverlayContainer;
