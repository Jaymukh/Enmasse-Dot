/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useSearchParams } from 'react-router-dom';

// CSS
import '../../styles/main.css';

// Components
import MapOptions from './MapOptions';
import GlobalMap from './GlobalMap';
import StateMap from './StateMap';
import { BreadcrumbItem } from '../ui/breadcrumb/Breadcrumb';
import { geoJsonState, spinnerState, mapFeatureState, errorState } from '../../states';

// Utilities
import { useMapsService } from '../../services';
import { rollbar } from '../../constants';


const countries = [{ geo_id: 1, name: 'India' }];

function MapContainer() {
    const mapServices = useMapsService();
    const setSpinner = useSetRecoilState(spinnerState);
    const routeFlag = window.location.pathname === '/' ? true : false;
    const [global, setGlobal] = useState<boolean>(routeFlag);
    const [states, setStates] = useState<any>([]);
    const [districts, setDistricts] = useState<any>([]);
    const setGeoJSON = useSetRecoilState(geoJsonState);
    const setMapFeatures = useSetRecoilState(mapFeatureState);
    const setError = useSetRecoilState(errorState);

    const getSearchParams = () => {
        if (global) {
            return { country: '1' };
        }
    }

    const [searchParams, setSearchParams] = useSearchParams(getSearchParams());
    const [breadcrumbList, setBreadcrumbList] = useState<BreadcrumbItem[]>([{ key: 'country', geo_id: 1, label: 'India', link: '?&country=1' }])

    const getSelectedObject = () => {
        const params: Record<string, string> = {};
        searchParams?.toString().split('&').forEach((param) => {
            const [key, value] = param.split('=');
            params[key] = value;
        });
        return params;
    }
    const [selected, setSelected] = useState<any>(getSelectedObject());

    const handleGlobal = () => {
        setGlobal(!global);
        // navigate({
        //     pathname: RouteConstants.root,
        //     search: '?country=1',
        // });
    }

    const handleCountryChange = () => {
        setGlobal(!global);
        // setTimeout(() => {
        //     navigate(global ? `${RouteConstants.explore}?country=1` : RouteConstants.root);
        // });
        setSelected({ country: 1 });
    };

    const handleStateChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        updateSelected('state', value);
    };

    const handleDistrictChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        updateSelected('district', value);
    };

    const updateBreadcrumb = () => {
        const keys = Object.keys(selected).filter(key => selected[key]);
        const resultArray: { key: string; geo_id: any; label: string; link: string; }[] = [{ key: 'global', geo_id: null, label: 'Global', link: '/' }];

        let link = '';
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

    const handleBreadcrumbClick = (item: BreadcrumbItem, index: number) => {
        if (index !== breadcrumbList.length - 1) {
            if (item.key === 'global') {
                // handleGlobal();
            } else {
                updateSelected(item.key, item.geo_id);
            }
        }
    }

    const updateSelected = (key: string, value: any) => {
        if (key === 'district') {
            setSelected({ ...selected, district: value });
        } else if (key === 'state') {
            setSelected({ ...selected, state: value, district: '' });
        } else if (key === 'country') {
            setSelected({ country: value, state: '', district: '' })
        }
    }

    const fetchDropdownList = (geo_id: string, level: string) => {
        mapServices.getDropdownList(Number(geo_id)).then((data: any) => {
            level === 'states' ? setStates(data) : setDistricts(data);
        }).catch(error => {
            errorHandler(error);
        });
    }

    const fetchGeoJsonData = (geo_id: string) => {
        mapServices.getMaps(Number(geo_id)).then((data: any) => {
            setGeoJSON(data);
            setSpinner(false);
            fetchMapCircles(geo_id);
        }).catch(error => {
            setSpinner(false);
            errorHandler(error);
        });
    }

    const fetchMapCircles = (geo_id: string) => {
        mapServices.getCircle(Number(geo_id)).then(data => {
            setMapFeatures(prevMapFeatures => ({
                ...prevMapFeatures,
                circles: data
            }));
        }).catch(error => {
            errorHandler(error);
        });
    }

    const fetchFeaturedStories = (geo_id: string) => {
        mapServices.getFeaturedStories(Number(geo_id)).then(data => {
            setMapFeatures(prevMapFeatures => ({
                ...prevMapFeatures,
                featuredStories: data
            }));
        }).catch(error => {
            errorHandler(error);
        });
    }

    const errorHandler = (error: any) => {
        const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
        setError({ type: 'Error', message: errorMsg });
        rollbar.error(error);
    };

    useEffect(() => {
        if (selected) {
            const currentParams = new URLSearchParams();
            for (const key in selected) {
                if (selected[key]) {
                    currentParams.set(key, selected[key]);
                }
            }
            setSearchParams(currentParams);
        }
    }, [selected]);

    useEffect(() => {
        updateBreadcrumb();
    }, [selected, states, districts]);

    useEffect(() => {
        setSpinner(true);
        fetchDropdownList(selected.country, 'states');
        if (selected.district) {
            fetchDropdownList(selected.state, 'districts');
            fetchGeoJsonData(selected.district);
            // fetchMapCircles(selected.district);
            fetchFeaturedStories(selected.district);
            mapServices?.getCifData(selected.district);
        } else if (selected.state) {
            fetchDropdownList(selected.state, 'districts');
            fetchGeoJsonData(selected.state);
            // fetchMapCircles(selected.state);
            fetchFeaturedStories(selected.state);
            mapServices?.getCifData(selected.state);
        } else if (selected.country) {
            fetchGeoJsonData(selected.country);
            // fetchMapCircles(selected.country);
            fetchFeaturedStories(selected.country);
            mapServices?.getCifData(selected.country);
        }
    }, [selected.country, selected.state, selected.district]);

    return (
        <div className='MapContainer mx-0' style={{ height: '91.75vh' }}>
            <MapOptions
                handleCountryChange={handleCountryChange}
                handleStateChange={handleStateChange}
                handleDistrictChange={handleDistrictChange}
                handleGlobal={handleGlobal}
                global={global}
                countries={countries}
                states={states}
                districts={districts}
                selected={selected}
            />
            {!global ? (
                <GlobalMap />
            ) : (
                <StateMap
                    selected={selected}
                    breadcrumbs={breadcrumbList}
                    handleBreadcrumbClick={handleBreadcrumbClick}
                />
            )}
        </div>
    );
}

export default MapContainer;
