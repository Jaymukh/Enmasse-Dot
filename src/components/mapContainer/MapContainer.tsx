import '../../App.css';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { RouteConstants } from '../../constants';
import { useMapsService } from '../../services';
import { geoJsonState, spinnerState } from '../../states';
import MapOptions from './MapOptions';
import GlobalMap from './GlobalMap';
import StateMap from './StateMap';
import { mapFeatureState } from '../../states/MapFeatureState';

const countries = [{ geo_id: 1, name: 'India' }];

function MapContainer() {
    const navigate = useNavigate();
    const mapServices = useMapsService();
    const setSpinner = useSetRecoilState(spinnerState);

    const routeFlag = window.location.pathname === '/' ? true : false;

    const [global, setGlobal] = useState<boolean>(routeFlag);
    const [states, setStates] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const setGeoJSON = useSetRecoilState(geoJsonState);
    const [mapFeatures, setMapFeatures] = useRecoilState(mapFeatureState);

    const getSearchParams = () => {
        if (global) {
            return { country: '1' };
        }
    }

    const [searchParams, setSearchParams] = useSearchParams(getSearchParams());
    const [breadcrumbList, setBreadcrumbList] = useState<any>([{ key: 'country', geo_id: '1', label: 'India', link: '?&country=1' }])

    const getSelectedObject = () => {
        const params: Record<string, string> = {};
        searchParams?.toString().split('&').forEach((param) => {
            const [key, value] = param.split('=');
            params[key] = value;
        });
        return params;
    }
    const [selected, setSelected] = useState<any>(getSelectedObject());

    const handleCountryChange = () => {
        setGlobal(!global);
        setTimeout(() => {
            navigate(global ? `${RouteConstants.explore}?country=1` : RouteConstants.root);
        });
        setSelected({ country: 1 });
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelected({ ...selected, state: value, district: '' });
        searchParams.delete('district');
        updateSearchParams('state', value);
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelected({ ...selected, district: value })
        updateSearchParams('district', value);
    };

    const updateBreadcrumb = () => {
        const keys = Object.keys(selected).filter(key => selected[key]);
        const resultArray: { key: string; geo_id: any; label: string; link: string; }[] = [{ key: 'global', geo_id: null, label: 'Global', link: '/' }];

        let link = '?';
        keys.forEach((key, index) => {
            link += `&${key}=${selected[key]}`;
            const geo_id = Number(selected[key]);
            const label = key === 'country'
                ? countries?.find((country: any) => country.geo_id === geo_id)?.name
                : key === 'state'
                    ? states?.find((state: any) => state.geo_id === geo_id)?.name
                    : districts?.find((district: any) => district.geo_id === geo_id)?.name;
            resultArray.push({ key, geo_id, label, link });
        });
        setBreadcrumbList(resultArray);
    };

    const updateSearchParams = (name: string, value: string) => {
        const currentParams = new URLSearchParams(searchParams.toString());
        currentParams.set(name, value);
        setSearchParams(currentParams);
    }

    const getGeoJsonData = (geo_id: string) => {
        mapServices.getMaps(Number(geo_id)).then(data => {            
            setGeoJSON(data);
            setSpinner(false);
        }).catch(error => {
            setSpinner(false);
            errorHandler(error);
        });
    }

    const fetchMapCircles = (geo_id: string) => {
        mapServices.getCircle(Number(geo_id)).then(data => {            
            setMapFeatures({ ...mapFeatures, circles: data });
            setSpinner(false);
        }).catch(error => {
            setSpinner(false);
            //errorHandler(error);
        });
    }

    const errorHandler = (error: any) => {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        toast.error(errorMsg);
    };

    useEffect(() => {
        updateBreadcrumb();
    }, [selected, states, districts])

    useEffect(() => {
        mapServices.getDropdownList(selected.country).then(data => {
            setStates(data.children);
        }).catch(error => {
            errorHandler(error);
        });
        if (selected.district) {
            mapServices.getDropdownList(selected.state).then(data => {
                setDistricts(data.children);
            }).catch(error => {
                errorHandler(error);
            });
            setSpinner(true);
            getGeoJsonData(selected.district);
            fetchMapCircles(selected.district);
        } else if (selected.state) {
            setSpinner(true);
            updateSearchParams('state', selected.state);
            mapServices.getDropdownList(selected.state).then(data => {
                setDistricts(data.children);
            }).catch(error => {
                errorHandler(error);
            });
            getGeoJsonData(selected.state);
            fetchMapCircles(selected.state);
        } else if (selected.country) {
            setSpinner(true);
            updateSearchParams('country', selected.country);
            getGeoJsonData(selected.country);
            fetchMapCircles(selected.country);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected.country, selected.state, selected.district]);
    return (
        <div className='MapContainer mx-0 header2' style={{ height: '91.75vh' }}>
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
                    breadcrumbs={breadcrumbList}
                />
            )}
        </div>
    );
}

export default MapContainer;
