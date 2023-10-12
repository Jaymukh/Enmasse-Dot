/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../../App.css';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import * as MapConstants from '../../utils/json/googlemapstyle'
import * as Constants from '../../utils/constants/Constants';
import CoreSolutions from './CoreSolutions';
import MapPopup from './MapPopup';
import DistrictSideBar from '../familyContainer/family/DistrictSidebar';
import { useRecoilValue } from 'recoil';
import { geoJsonState } from '../../states/GeoJSONState';
import { Breadcrumb } from '../ui/breadcrumb/Breadcrumb';


interface StateMapProps {
    features?: any;
    handleImportFeature?: (code?: string | undefined) => void;
    selected: any;
    pointFeatures?: any[];
}

const StateMap: React.FC<StateMapProps> = ({
    selected,
    pointFeatures
}) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [circles, setCircles] = useState<google.maps.Circle[]>([]);
    const [selectedRb, setSelectedRb] = useState(0);
    const [selectedCoreSoln, setSelectedCoreSoln] = useState({ key: 0, label: 'All', type: 'radius_all' });
    const [focused, setFocused] = useState(0);
    const [isChecked, setIsChecked] = useState<any>({ coreSolution: false, viewStories: false });
    const geoJSON = useRecoilValue(geoJsonState);

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const [center, setCenter] = useState({
        lat: 22.7196,
        lng: 73.97449
    });

    const mapOptions = {
        // disableDefaultUI: true,
        // zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: MapConstants.NonGlobalMapStyle,
        isFractionalZoomEnabled: true,
        keyboardShortcuts: false
    };

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
        circles.forEach((circle) => circle.setMap(null));
        setCircles([]);
    };

    const handleFocused = (index: number) => {
        setFocused(index);
    }

    useEffect(() => {
        if (map && Object.keys(geoJSON).length) {
            setIsChecked({ ...isChecked, coreSolution: true });
            map.data.forEach((feature) => {
                map.data.remove(feature);
            });
            map.data.addGeoJson(geoJSON);

            map.data.setStyle((feature) => {
                const fillColor = feature.getProperty('Color');
                return {
                    fillColor,
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 0.75,                    
                };
            });

            const processCoordinates = (coordinates: any) => {
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
        if (!isChecked.coreSolution) {
            clearCircles();
        }
        else if (map && pointFeatures && isChecked.coreSolution) {
            clearCircles();
            const newCircles = pointFeatures.map((feature) => {
                const center = {
                    lat: feature.geometry.coordinates[1],
                    lng: feature.geometry.coordinates[0],
                };
                const type = selectedCoreSoln.type;

                const radii = type !== 'radius_all' ? ['radius_all', type] : [type];

                return radii.map((radius, i) => {
                    const fillOpacity = i === 0 && radii.length > 1 ? 0 : 0.5;

                    return new window.google.maps.Circle({
                        center: center,
                        radius: feature.properties[radius],
                        fillColor: '#FFFFFF',
                        fillOpacity: fillOpacity,
                        strokeColor: '#FFFFFF',
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        zIndex: 100,
                        map: map,
                    });
                });
            });

            setCircles(newCircles.flat());
        }
    }, [map, pointFeatures, selectedCoreSoln, isChecked.coreSolution]);

    useEffect(() => {
        clearCircles();
    }, [selected.country, selected.state, selected.district]);

    return (
        <div className='row mx-0'
            style={{ height: '81vh', zIndex: 999 }}>
            <div className='col-9 row p-0 m-0'>
                {/* <div className='col-12'>
                    <Breadcrumb />
                </div> */}
                <div className='col-3 p-0' style={{ backgroundColor: '#F4F6F8' }}>
                    <CoreSolutions isChecked={isChecked} toggleSwitch={toggleSwitch} handleChangeRb={handleChangeRb} selectedRb={selectedRb} />
                </div>
                <div className='col-9 p-0'>
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
                                {Constants.storyFeatures && isChecked?.viewStories && (
                                    Constants.storyFeatures.map((feature, index) => (
                                        <InfoWindow
                                            position={feature.position}
                                            // onClose={handleHoverEnd}
                                            // closeButton={false}
                                            options={{
                                                padding: 0,
                                                maxWidth: 250,
                                                borderRadius: 0,
                                                zIndex: focused === index ? 1000 : 0
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
            <div className='col-3 p-0 h-100'>
                <DistrictSideBar />
            </div>
        </div>
    )
}

export default StateMap;