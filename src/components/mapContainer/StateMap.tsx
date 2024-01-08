/* eslint-disable react-hooks/exhaustive-deps */
// External libraries
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import { useRecoilValue } from 'recoil';

// CSS
import '../../styles/main.css';

// Components
import CoreSolutions from './CoreSolutions';
import MapPopup from './MapPopup';
import DistrictSideBar from '../familyContainer/family/DistrictSidebar';
import { Breadcrumb, BreadcrumbItem } from '../ui/breadcrumb/Breadcrumb';
import { geoJsonState, mapFeatureState } from '../../states';

// Utilities
import * as MapConstants from '../../utils/json/googlemapstyle'
import * as Constants from '../../utils/constants/Constants';
import { useMapsService } from '../../services';


interface Option {
    label: string;
    key: number;
    type: string;
}

interface StateMapProps {
    selected: any;
    updateSelected: (key: string, value: any) => void;
    breadcrumbs: BreadcrumbItem[];
    handleBreadcrumbClick: (item: BreadcrumbItem, index: number) => void;
}

const StateMap: React.FC<StateMapProps> = ({
    selected,
    updateSelected,
    breadcrumbs,
    handleBreadcrumbClick
}) => {
    const mapRef = useRef(null);
    const mapServices = useMapsService();
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [circles, setCircles] = useState<google.maps.Marker[]>([]);
    const [selectedRb, setSelectedRb] = useState(0);
    const [coreSolutions, setCoreSolutions] = useState<Option[]>([]);
    const [selectedCoreSoln, setSelectedCoreSoln] = useState<Option>();
    const [focused, setFocused] = useState(0);
    const [isChecked, setIsChecked] = useState<any>({ coreSolution: false, viewStories: false });
    const geoJSON = useRecoilValue(geoJsonState);
    const mapFeatures = useRecoilValue(mapFeatureState);

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const [center, setCenter] = useState({
        lat: 22.7196,
        lng: 73.97449
    });

    const mapOptions = {
        disableDefaultUI: true,
        mapTypeControl: false,
        streetViewControl: false,
        styles: MapConstants.NonGlobalMapStyle,
        isFractionalZoomEnabled: true,
        keyboardShortcuts: false,
        gestureHandling: "none", //manual zoom handling
        zoomControl: false,
        clickableIcons: true,
    };

    const onClickMapFeature = (feature: any) => {
        debugger
        if (selected.district) {
            return;
        } else if (selected.state) {
            updateSelected('district', feature?.id);
        } else if (selected.country) {
            updateSelected('state', feature?.id);
        }
    }

    const toggleSwitch = (event?: React.ChangeEvent<HTMLInputElement>) => {
        const name: string = event?.target?.name!;
        setIsChecked({ ...isChecked, [name]: !isChecked[name] });
    };

    const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
        (mapInstance as any).circles = [];
    }, []);

    const handleChangeRb = (event: { target: { value: any; }; }, option: Constants.Option) => {
        setSelectedRb(Number(event.target.value));
        setSelectedCoreSoln(option);
    };

    const clearCircles = () => {
        setCircles((prevCircles) => {
            prevCircles.forEach((circle) => {
                circle.setMap(null);
            });
            return [];
        });
    };

    const handleFocused = (index: number) => {
        debugger
        setFocused(index);
    };

    useEffect(() => {
        const geoCode = geoJSON?.rootProperties?.id;
        if (geoCode) {
            mapServices.getCoreSolutions(Number(geoCode)).then(data => {
                setCoreSolutions(data);
                setSelectedCoreSoln(data[0]);
                setIsChecked({ ...isChecked, coreSolution: data.length > 0 });
            }).catch(error => {
                // const errorMsg = error?.response?.data?.message || "Something went wrong. Please try again.";
                // setError({ type: 'Error', message: errorMsg });
            });
        }
    }, [geoJSON]);

    useEffect(() => {
        if (map && Object.keys(geoJSON).length) {
            map.data.forEach((feature) => {
                map.data.remove(feature);
            });
            map.data.addGeoJson(geoJSON);
            map.data.addListener('click', (event: any) => onClickMapFeature(event?.feature?.Ig));

            map.data.setStyle((feature) => {
                const fillColor = feature.getProperty('Color');
                return {
                    fillColor,
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 0.5,
                };
            });

            const processCoordinates = (coordinates: any): void => {
                if (Array.isArray(coordinates[0])) {
                    // Multi-part geometry, like a polygon with holes or a multi-line string
                    coordinates.forEach((coordSet: any) => {
                        processCoordinates(coordSet);
                    });
                } else {
                    // Single set of coordinates
                    bounds.extend(new window.google.maps.LatLng(coordinates[1], coordinates[0]));
                }
            };

            const bounds = new window.google.maps.LatLngBounds();
            geoJSON.features.forEach((feature: any) => {
                processCoordinates(feature.geometry.coordinates);
            });

            // Set map center and zoom level based on bounding box
            map.fitBounds(bounds);
            setCenter({ lat: bounds.getCenter().lat(), lng: bounds.getCenter().lng() });
        }
    }, [map, geoJSON]);

    useEffect(() => {
        clearCircles();
        if (map && mapFeatures?.circles && mapFeatures?.circles?.length > 0 && isChecked?.coreSolution) {
            const newCircles = mapFeatures?.circles?.map((feature: any) => {
                const type = selectedCoreSoln?.type;
                const coreSumType = coreSolutions[0].type;

                const radii = type !== coreSumType ? [coreSumType, type] : [type];
                return radii.map((radius, i) => {
                    if (radius) {
                        const fillOpacity = i === 0 && radii.length > 1 ? 0 : 0.5;
                        const marker = new google.maps.Marker({
                            position: new google.maps.LatLng(feature.geometry.coordinates[1], feature.geometry.coordinates[0]),
                            icon: {
                                path: google.maps.SymbolPath.CIRCLE,
                                fillColor: '#FFFFFF',
                                fillOpacity,
                                strokeWeight: 2,
                                strokeColor: '#FFFFFF',
                                rotation: 0,
                                scale: feature.properties[radius] * 30,
                            },
                            map: map,
                        });
                        marker?.addListener('click', () => onClickMapFeature(feature));
                        return marker;
                    }
                    return null;
                });
            });
            setCircles(newCircles.flat().filter(circle => circle !== null) as google.maps.Marker[]);
        }
    }, [map, mapFeatures.circles, selectedCoreSoln, isChecked.coreSolution]);

    useEffect(() => {
        clearCircles();
        setSelectedRb(0);
    }, [selected.country, selected.state, selected.district]);

    useEffect(() => {
        if (mapFeatures.featuredStories?.featuredStories?.length > 0 ) {
            setIsChecked({ ...isChecked, viewStories: true });
        }
    }, [mapFeatures.featuredStories]);


    return (
        <div className='row mx-0'
            style={{ height: '85.5vh', zIndex: 999 }}>
            <div className='col-xl-9 col-lg-9 col-md-12 m-0 p-0'>
                <div className='row m-0 p-0 h-100'>
                    <div className='col-12 ps-3 py-2 bg-white border-bottom d-flex align-items-center' style={{ height: '5.25vh' }}>
                        <Breadcrumb items={breadcrumbs} handleBreadcrumbClick={handleBreadcrumbClick} />
                    </div>
                    <div className='col-xl-3 col-lg-3 col-md-12 p-0' style={{ backgroundColor: '#F4F6F8', height: '80.25vh' }}>
                        <CoreSolutions
                            isChecked={isChecked}
                            toggleSwitch={toggleSwitch}
                            handleChangeRb={handleChangeRb}
                            selectedRb={selectedRb}
                            options={coreSolutions}
                        />
                    </div>
                    <div className='col-xl-9 col-lg-9 col-md-12 p-0' style={{ height: '80.25vh' }}>
                        {apiKey && (
                            <LoadScript
                                googleMapsApiKey={apiKey}
                            >
                                <GoogleMap
                                    ref={mapRef}
                                    zoom={6}
                                    mapContainerStyle={MapConstants.containerStyle}
                                    center={center}
                                    onLoad={handleMapLoad}
                                    options={mapOptions}
                                >
                                    {mapFeatures.featuredStories?.featuredStories && isChecked?.viewStories && Object.keys(geoJSON).length && (
                                        mapFeatures.featuredStories?.featuredStories?.map((feature: any, index: number) => (
                                            <InfoWindow
                                                position={{
                                                    lng: feature.properties.geometry.coordinates[0],
                                                    lat: feature.properties.geometry.coordinates[1]
                                                }}
                                                // onClose={handleHoverEnd}                                                
                                                options={{
                                                    padding: 0,
                                                    maxWidth: 224,
                                                    borderRadius: 0,
                                                    overflow: 'hidden',
                                                    zIndex: focused === index ? 1000 : 0,
                                                } as any}
                                            >
                                                <MapPopup
                                                    properties={feature.properties}
                                                    handleFocused={handleFocused}
                                                    index={index}
                                                />
                                            </InfoWindow>
                                        ))
                                    )}
                                </GoogleMap>
                            </LoadScript>
                        )}
                    </div>
                </div>
            </div>
            <div className='col-xl-3 col-lg-3 col-md-11 p-0 h-100'>
                <DistrictSideBar />
            </div>
        </div>
    )
}

export default StateMap;