import '../../styles/mapcontainer/MapContainer.css';
import React, { useState, ChangeEvent } from 'react';
import MapOptions from './mapoptions/MapOptions';
import Map from './map/Map';
import { Country, State } from 'country-state-city';

interface CountryInfo {
    name: string;
    isoCode: string;
}

interface StateInfo {
    name: string;
}

interface DistrictInfo {
    key: string;
    name: string;
    state: string;
}

const countries: CountryInfo[] = Country.getAllCountries();

const districts: DistrictInfo[] = [
    {
        key: "JG",
        name: "Junagadh",
        state: "Gujarat"
    }
];

function MapContainer() {
    const [global, setGlobal] = useState<boolean>(true);
    const [selectedCountry, setSelectedCountry] = useState<CountryInfo | {}>({});
    const [selectedState, setSelectedState] = useState<StateInfo | {}>({});
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [states, setStates] = useState<StateInfo[] | undefined>();

    const handleGlobal = () => {
        setGlobal(!global);
        setSelectedCountry({});
        setSelectedState({});
        setSelectedDistrict('');
    };

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        const selectedItem = countries.find(item => item.name === value);
        if (selectedItem) {
            setStates(State.getStatesOfCountry(selectedItem.isoCode));
            setSelectedCountry(selectedItem);
            setSelectedState({});
            setSelectedDistrict('');
        }
    };

    const handleStateChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (states) {
            const selectedItem = states.find(item => item.name === value);
            setSelectedState(selectedItem || {});
        }
    };

    const handleDistrictChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedDistrict(value);
    };

    return (
        <div className='MapContainer mx-0'>
            <MapOptions
                handleGlobal={handleGlobal}
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
                global={global}
                selectedCountry={selectedCountry.name}
                selectedState={selectedState.name}
                selectedDistrict={selectedDistrict}
                countries={countries.map(country => country.name)}
                states={states?.map(state => state.name)}
                districts={districts}
            />
            <Map
                global={global}
                selectedCountry={selectedCountry.name}
                selectedCountryCode={selectedCountry.isoCode}
                selectedState={selectedState.name}
                selectedDistrict={selectedDistrict}
            />
        </div>
    );
}

export default MapContainer;
