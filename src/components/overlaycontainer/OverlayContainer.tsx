import React from 'react';
import '../../App.css';
import LandingPage from './LandingPage';
import EHInfographic from './EHInfographic';
import ISPInfographic from './ISPInfographic';
import TAMInfographic from './TAMInfographic';
import { useRecoilValue } from "recoil";
import { helpState } from '../../states';

const OverlayContainer = () => {

	const showHelp = useRecoilValue(helpState);

	return (
		<div className='OverlayContainer'>
			{(showHelp === 0) &&
				<LandingPage />}
			{(showHelp === 1) &&
				<EHInfographic />}
			{(showHelp === 2) &&
				<ISPInfographic />}
			{(showHelp === 3) &&
				<TAMInfographic />}
		</div>
	);
}

export default OverlayContainer;
