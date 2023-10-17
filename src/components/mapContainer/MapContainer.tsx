import '../../App.css';
import React, { useState } from 'react';
import MapOptions from './mapOptions/MapOptions';
import Map from './map/Map';
import { Country, State } from 'country-state-city';
import { SelectChangeEvent } from '@mui/material';

const countries: any = Country.getAllCountries();

const districts: any = [
    {
        key: "JG",
        name: "Junagadh",
        state: "Gujarat"
    }
];

function MapContainer() {
    const [global, setGlobal] = useState<boolean>(true);
    const [selectedCountry, setSelectedCountry] = useState<any>({}); // Initialize with undefined
    const [selectedState, setSelectedState] = useState<any>({}); // Initialize with undefined
    const [selectedDistrict, setSelectedDistrict] = useState<any>({});
    const [states, setStates] = useState<any>();

    const handleGlobal = () => {
        setGlobal(!global);
        setSelectedCountry({});
        setSelectedState({});
        setSelectedDistrict('');
    };

    const handleCountryChange = (event: SelectChangeEvent) => {
        const value = event.target.value;
        const selectedItem = countries.find((item: any) => item.name === value);
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
            const selectedItem = states.find((item: any) => item.name === value);
            setSelectedState(selectedItem);
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
                selectedCountry={selectedCountry?.name} // Use optional chaining and default value
                selectedState={selectedState?.name}
                selectedDistrict={selectedDistrict}
                countries={countries}
                states={states}
                districts={districts}
            />
            <Map
                global={global}
                selectedCountry={selectedCountry?.name} // Use optional chaining and default value
                selectedState={selectedState?.name}
                selectedCountryCode={selectedCountry?.isoCode}
                selectedDistrict={selectedDistrict}
            />
        </div>
    );
}

export default MapContainer;
