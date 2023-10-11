import '../../App.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { useMapsService } from '../../services';
import { geoJsonState, spinnerState } from '../../states';
import MapOptions from './MapOptions';
import Map from './Map';

const countries = [{ geo_id: 1, name: 'India' }];

function MapContainer() {
    const navigate = useNavigate();
    const mapServices = useMapsService();
    const setSpinner = useSetRecoilState(spinnerState);
    const [searchParams, setSearchParams] = useSearchParams({ country: '1' });

    const routeFlag = window.location.pathname === '/' ? true : false;

    const [global, setGlobal] = useState<boolean>(routeFlag);
    const [selectedCountry, setSelectedCountry] = useState<any>(countries[0]); // Initialize with undefined
    const [selectedState, setSelectedState] = useState<any>({}); // Initialize with undefined
    const [selectedDistrict, setSelectedDistrict] = useState<any>({});
    const [states, setStates] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const [selected, setSelected] = useState({ country: searchParams.get('country'), state: searchParams.get('state'), district: searchParams.get('district') })

    const setGeoJSON = useSetRecoilState(geoJsonState);

    const handleCountryChange = () => {
        global ? navigate(RouteConstants.explore) : navigate(RouteConstants.root);
        setGlobal(!global);
        setSelectedState({});
        setSelectedDistrict({});
        setSearchParams({ country: 'IN' });
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(event.target.value);
        if (states) {
            const selectedItem = states.find((item: any) => item.geo_id === value);
            setSelectedState(selectedItem);
            updateSearchParams('state', selectedItem.geo_id);
        }
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = Number(event.target.value);
        if (districts) {
            const selectedItem = districts.find((item: any) => item.geo_id === value);
            setSelectedDistrict(selectedItem);
            updateSearchParams('district', selectedItem.geo_id);
        }
    };

    const updateSearchParams = (name: string, value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set(name, value);
        setSearchParams(currentParams);
    }

    const getGeoJsonData = (geo_id: number) => {
        mapServices.getMaps(geo_id).then(data => {
            setSpinner(false);
            setGeoJSON(data);
        }).catch(error => {
            setSpinner(false);
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
            toast.error(errorMsg);
        });
    }

    useEffect(() => {
        if (selectedCountry?.geo_id) {
            setSpinner(true);
            updateSearchParams('country', selectedCountry.geo_id);
            mapServices.getDropdownList(selectedCountry.geo_id).then(data => {
                setStates(data.children);
            }).catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
            getGeoJsonData(selectedCountry.geo_id);
        }
    }, [selectedCountry?.geo_id]);

    useEffect(() => {
        if (selectedState?.geo_id) {
            setSpinner(true);
            updateSearchParams('state', selectedState.geo_id);
            mapServices.getDropdownList(selectedState.geo_id).then(data => {
                setDistricts(data.children);
            }).catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
            getGeoJsonData(selectedState.geo_id);
        }
    }, [selectedState?.geo_id]);

    useEffect(() => {
        if (selectedDistrict?.geo_id) {
            setSpinner(true);
            getGeoJsonData(selectedDistrict.geo_id);
        }
    }, [selectedDistrict?.geo_id]);

    return (
        <div className='MapContainer mx-0  header2' style={{ height: '88.5vh' }}>
            <MapOptions
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
                global={global}
                selectedCountry={selectedCountry?.geo_id}
                selectedState={selectedState?.geo_id}
                selectedDistrict={selectedDistrict?.geo_id}
                countries={countries}
                states={states}
                districts={districts}
            />
            <Map
                global={global}
                selectedCountry={selectedCountry?.geo_id}
                selectedState={selectedState?.geo_id}
                selectedCountryCode={selectedCountry?.geo_id}
                selectedDistrict={selectedDistrict?.geo_id}
            />
        </div>
    );
}

export default MapContainer;
