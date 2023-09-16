import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import * as MapConstants from '../../../utils/json/googlemapstyle';
import GlobalOverlayCard from '../../GlobalOverlayCard';
import InsightBar from '../../InsightBar';
import { toast } from 'react-toastify';

interface GlobalMapProps {
	features: any; // Replace 'any' with the actual type of 'features' if available
	handleImportFeature: (code: string) => void;
}

const GlobalMap: React.FC<GlobalMapProps> = ({ features, handleImportFeature }) => {
	const apiKey = process.env.REACT_APP_GOOGLE_API_KEY || '';
	const center = {
		lat: 20.5937,
		lng: 78.9629
	};

	const handleMapClick = (event: google.maps.MapMouseEvent) => {
		const geocoder = new window.google.maps.Geocoder();
		geocoder.geocode({ location: event.latLng }, (results, status) => {
			if (status === 'OK' && Array.isArray(results) && results.length > 0) {
				const country = results.find((component) => component.types.includes('country'));
				if (country) {
					const countryCode = country.address_components?.[0]?.short_name || '';
					handleImportFeature(countryCode);
				}
			} else {
				toast.error('Geocode was not successful');
			}
		});
	};


	const mapOptions: google.maps.MapOptions = {
		disableDefaultUI: true,
		zoomControl: false,
		styles: MapConstants.gmapstyle
	};

	return (
		<div className='map row mx-0'
			style={{ height: '81vh', width: '100vw', zIndex: 999 }}
		>
			<div className='row bg-transparent h-100 w-100 overlay-card'>
				<div className='col-8'>
					<GlobalOverlayCard />
				</div>
				<div className='col-4 px-0 d-flex justify-content-end'>
					<InsightBar />
				</div>
			</div>
			<LoadScript googleMapsApiKey={apiKey}>
				<GoogleMap mapContainerStyle={MapConstants.containerStyle} center={center} zoom={1.5} options={mapOptions} onClick={handleMapClick}>
					{/* Additional components and markers can be added here */}
				</GoogleMap>
			</LoadScript>
		</div>
	);
};

export default GlobalMap;
