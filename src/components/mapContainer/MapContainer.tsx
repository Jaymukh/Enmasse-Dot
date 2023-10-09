import '../../App.css';
import React, { useState } from 'react';
import MapOptions from './MapOptions';
import Map from './Map';
import { Country, State } from 'country-state-city';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { useSearchParams } from 'react-router-dom';

// const countries: any = Country.getAllCountries();
const countries: any = [Country.getCountryByCode('IN')];

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

    const [searchParams, setSearchParams] = useSearchParams();

    const handleGlobal = () => {
        global ? navigate(RouteConstants.explore) : navigate(RouteConstants.root);
        setGlobal(!global);
        setSelectedCountry({});
        setSelectedState({});
        setSelectedDistrict('');
    };

    const handleCountryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setStates(State.getStatesOfCountry('IN'));
        setSelectedCountry(countries[0]);
        setSelectedState(undefined);
        setSelectedDistrict('');
        setSearchParams({ country: 'IN'});
        // const value = event.target.value;
        // const selectedItem = countries.find((item: any) => item.name === value);
        // if (selectedItem) {
        //     setStates(State.getStatesOfCountry(selectedItem.isoCode));
        //     setSelectedCountry(selectedItem);
        //     setSelectedState(undefined);
        //     setSelectedDistrict('');
        //     setSearchParams({ country: selectedItem.isoCode });
        // }
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (states) {
            const selectedItem = states.find((item: any) => item.name === value);
            setSelectedState(selectedItem);
            updateSearchParams('state', selectedItem.name);
        }
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value as string;
        setSelectedDistrict(value);
        updateSearchParams('district', value);
    };

    const updateSearchParams = (name: string, value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set(name, value);
        setSearchParams(currentParams);
    }

    return (
        <div className='MapContainer mx-0  header2' style={{ height: '88.5vh' }}>
            <MapOptions
                handleGlobal={handleGlobal}
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
                global={global}
                selectedCountry={selectedCountry?.name}
                selectedState={selectedState?.name}
                selectedDistrict={selectedDistrict}
                // selectedCountry={searchParams.get('country')}
                // selectedState={searchParams.get('state')}
                // selectedDistrict={searchParams.get('district')}
                countries={countries}
                states={states}
                districts={districts}
            />
            <Map
                global={global}
                selectedCountry={searchParams.get('country')}
                selectedState={searchParams.get('state')}
                selectedCountryCode={searchParams.get('country')}
                selectedDistrict={searchParams.get('district')}
            />
        </div>
    );
}

export default MapContainer;
