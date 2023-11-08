import Header from './headercontainer/Header';
import MapContainer from './mapContainer/MapContainer';


const HomeContainer = () => {

	return (
		<>
			<div className='w-100 primary-bg fixed-header'>
				<Header	/>
				<MapContainer />
			</div>
		</>
	);
};

export default HomeContainer;