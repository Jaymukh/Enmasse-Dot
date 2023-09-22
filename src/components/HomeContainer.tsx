import React from 'react';
import Header from './headercontainer/Header';
import MapContainer from './mapContainer/MapContainer';
import OverlayContainer from '../components/overlaycontainer/OverlayContainer';
import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";
import { overlayState } from '../states';


const HomeContainer = () => {
	const overlay = useRecoilValue(overlayState);

	return (
		<>
			<div className='w-100 primary-bg'>
				<Header	/>
				<MapContainer />
			</div>
			{overlay &&
				(<div className='overlay d-flex flex-wrap justify-content-center align-items-center'>
					<OverlayContainer />
				</div>)
			}
		</>
	);
};

export default HomeContainer;