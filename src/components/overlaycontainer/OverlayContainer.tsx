import React from 'react';
import '../../App.css';
import LandingPage from './LandingPage';
import EHInfographic from './EHInfographic';
import ISPInfographic from './ISPInfographic';
import TAMInfographic from './TAMInfographic';

interface OverlayContainerProps {
  showInfographic: number;
  handleOverlay: (overlay: boolean) => void;
  handleInfographic: (showInfographic: number) => void;
}

const OverlayContainer: React.FC<OverlayContainerProps> = ({ 
  showInfographic, 
  handleOverlay, 
  handleInfographic 
}) => {

  return (
    <div className='OverlayContainer'>
			{(showInfographic === 0) &&
				<LandingPage handleInfographic={handleInfographic} handleOverlay={handleOverlay} />}
			{(showInfographic === 1) &&
				<EHInfographic handleInfographic={handleInfographic} handleOverlay={handleOverlay} />}
			{(showInfographic === 2)  &&
				<ISPInfographic handleInfographic={handleInfographic} handleOverlay={handleOverlay} />}
			{(showInfographic === 3)  &&
				<TAMInfographic handleOverlay={handleOverlay} />}
		</div>
  );
}

export default OverlayContainer;
