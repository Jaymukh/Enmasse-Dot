import '../../styles/mapcontainer/MapContainer.css';
import React, { useState, ChangeEvent } from 'react';
import MapOptions from './mapoptions/MapOptions';
import Map from './map/Map';
import { Country, State } from 'country-state-city';
import { SelectChangeEvent } from '@mui/material';

interface CountryInfo {
    isoCode: string;
    name: string;
}

interface StateInfo {
    isoCode: string;
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
    const [selectedCountry, setSelectedCountry] = useState<CountryInfo | undefined>(undefined); // Initialize with undefined
    const [selectedState, setSelectedState] = useState<StateInfo | undefined>(undefined); // Initialize with undefined
    const [selectedDistrict, setSelectedDistrict] = useState<string>('');
    const [states, setStates] = useState<StateInfo[] | undefined>();

    const handleGlobal = () => {
        setGlobal(!global);
        setSelectedCountry(undefined);
        setSelectedState(undefined);
        setSelectedDistrict('');
    };

    const handleCountryChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const selectedItem = countries.find(item => item.name === value);
        if (selectedItem) {
            setStates(State.getStatesOfCountry(selectedItem.isoCode));
            setSelectedCountry(selectedItem);
            setSelectedState(undefined);
            setSelectedDistrict('');
        }
    };

    const handleStateChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        if (states) {
            const selectedItem = states.find(item => item.name === value);
            setSelectedState(selectedItem || undefined);
        }
    };

    const handleDistrictChange = (event: SelectChangeEvent) => {
        const value = event.target.value as string;
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
                selectedCountry={selectedCountry?.name || ''} // Use optional chaining and default value
                selectedState={selectedState?.name || ''}
                selectedDistrict={selectedDistrict}
                // countries={countries.map(country => country.name)}
                countries={countries}
                states={states}
                districts={districts}
            />
            <Map
                global={global}
                selectedCountry={selectedCountry?.name || ''} // Use optional chaining and default value
                selectedState={selectedState?.name || ''}
                selectedCountryCode={selectedCountry?.isoCode || ''}
                selectedDistrict={selectedDistrict}
            />
        </div>
    );
}

export default MapContainer;
