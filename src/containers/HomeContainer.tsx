import '../styles/main.css';
import Header from '../components/headercontainer/Header';
import MapContainer from '../components/mapContainer/MapContainer';

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