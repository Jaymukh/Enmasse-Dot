import '../../App.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetRecoilState } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { useMapsService } from '../../services';
import { geoJsonState, spinnerState } from '../../states';
import MapOptions from './MapOptions';
import GlobalMap from './GlobalMap';
import StateMap from './StateMap';

const countries = [{ geo_id: 1, name: 'India' }];

function MapContainer() {
    const navigate = useNavigate();
    const mapServices = useMapsService();
    const setSpinner = useSetRecoilState(spinnerState);
    const [searchParams, setSearchParams] = useSearchParams({ country: '1' });

    const routeFlag = window.location.pathname === '/' ? true : false;

    const [global, setGlobal] = useState<boolean>(routeFlag);
    const [states, setStates] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const setGeoJSON = useSetRecoilState(geoJsonState);

    const getSelectedObject = () => {
        const params: Record<string, string> = {};
        searchParams.toString().split('&').forEach((param) => {
            const [key, value] = param.split('=');
            params[key] = value;
        });
        return params;
    }
    const [selected, setSelected] = useState<any>(getSelectedObject());

    const handleCountryChange = () => {
        setGlobal(!global);
        setTimeout(() => {
            if (global) {
                navigate(`${RouteConstants.explore}?country=1`);               
            } else {
                navigate(RouteConstants.root);
            }
        });
        setSelected({ country: 1 });
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        delete selected['district'];
        setSelected({ ...selected, state: value })
        updateSearchParams('state', value);
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelected({ ...selected, district: value })
        updateSearchParams('district', value);
    };

    const updateSearchParams = (name: string, value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set(name, value);
        setSearchParams(currentParams);
    }

    const getGeoJsonData = (geo_id: string) => {
        mapServices.getMaps(Number(geo_id)).then(data => {
            setSpinner(false);
            setGeoJSON(data);
        }).catch(error => {
            setSpinner(false);
            const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
            toast.error(errorMsg);
        });
    }

    useEffect(() => {
        if (selected.district) {
            if (selected.state) {
                mapServices.getDropdownList(selected.state).then(data => {
                    setDistricts(data.children);
                }).catch(error => {
                    const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                    toast.error(errorMsg);
                });
                mapServices.getDropdownList(selected.country).then(data => {
                    setStates(data.children);
                }).catch(error => {
                    const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                    toast.error(errorMsg);
                });
            }
            setSpinner(true);
            getGeoJsonData(selected.district);
        } else if (selected.state) {
            setSpinner(true);
            updateSearchParams('state', selected.state);
            mapServices.getDropdownList(selected.state).then(data => {
                setDistricts(data.children);
            }).catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
            getGeoJsonData(selected.state);
        } else if (selected.country) {
            setSpinner(true);
            updateSearchParams('country', selected.country);
            mapServices.getDropdownList(selected.country).then(data => {
                setStates(data.children);
            }).catch(error => {
                const errorMsg = error?.response?.data?.message ? error?.response?.data?.message : "Something went wrong. Please try again."
                toast.error(errorMsg);
            });
            getGeoJsonData(selected.country);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected.country, selected.state, selected.district]);
    return (
        <div className='MapContainer mx-0  header2' style={{ height: '88.5vh' }}>
            <MapOptions
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
                global={global}
                countries={countries}
                states={states}
                districts={districts}
                selected={selected}
            />
            {global ? (
                <GlobalMap />
            ) : (
                <StateMap
                    selected={selected}
                />
            )}
        </div>
    );
}

export default MapContainer;
