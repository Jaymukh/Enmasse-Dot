import '../../App.css';
import React, { useState } from 'react';
import MapOptions from './MapOptions';
import Map from './Map';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';

const countries: any = Country.getAllCountries();

const districts: any = [
    {
        key: "JG",
        name: "Junagadh",
        state: "Gujarat"
    }
];

function MapContainer() {
    const navigate = useNavigate();
    const routeFlag = window.location.pathname === '/' ? true : false;
    const [global, setGlobal] = useState<boolean>(routeFlag);
    const [selectedCountry, setSelectedCountry] = useState<any>({}); // Initialize with undefined
    const [selectedState, setSelectedState] = useState<any>({}); // Initialize with undefined
    const [selectedDistrict, setSelectedDistrict] = useState<any>({});
    const [states, setStates] = useState<any>();

    const handleGlobal = () => {
        global ? navigate(RouteConstants.explore) : navigate(RouteConstants.root);
        setGlobal(!global);
        setSelectedCountry({});
        setSelectedState({});
        setSelectedDistrict('');
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const selectedItem = countries.find((item: any) => item.name === value);
        if (selectedItem) {
            setStates(State.getStatesOfCountry(selectedItem.isoCode));
            setSelectedCountry(selectedItem);
            setSelectedState(undefined);
            setSelectedDistrict('');
        }
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (states) {
            const selectedItem = states.find((item: any) => item.name === value);
            setSelectedState(selectedItem);
        }
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as string;
        setSelectedDistrict(value);
    };

    return (
        <div className='MapContainer mx-0 fixed-header header2' style={{ height: '88.5vh', position: 'inherit' }}>
            <MapOptions
                handleGlobal={handleGlobal}
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
                global={global}
                selectedCountry={selectedCountry?.name}
                selectedState={selectedState?.name}
                selectedDistrict={selectedDistrict}
                countries={countries}
                states={states}
                districts={districts}
            />
            <Map
                global={global}
                selectedCountry={selectedCountry?.name}
                selectedState={selectedState?.name}
                selectedCountryCode={selectedCountry?.isoCode}
                selectedDistrict={selectedDistrict}
            />
        </div>
    );
}

export default MapContainer;
