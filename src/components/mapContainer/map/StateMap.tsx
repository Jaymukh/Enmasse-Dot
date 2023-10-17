import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../../../App.css';
import { GoogleMap, LoadScript, InfoWindow } from '@react-google-maps/api';
import * as MapConstants from '../../../utils/json/googlemapstyle'
import * as Constants from '../../../utils/constants/Constants';
import CoreSolutions from './CoreSolutions';
import MapPopup from './MapPopup';
import DistrictSideBar from '../../familyContainer/family/DistrictSidebar';


interface StateMapProps {
    features: any;
    handleImportFeature: (code?: string | undefined) => void;
    selectedCountry: string;
    selectedState: string;
    selectedDistrict: string;
    pointFeatures: any[];
}
interface Feature {
    type: string;
    id: number;
    geometry: {
        type: string;
        coordinates: any;
    };
}

const StateMap: React.FC<StateMapProps> = ({
    features,
    handleImportFeature,
    selectedCountry,
    selectedState,
    selectedDistrict,
    pointFeatures
}) => {
    const mapRef = useRef(null);
    const [map, setMap] = useState<google.maps.Map | null>(null);
    const [circles, setCircles] = useState<google.maps.Circle[]>([]);
    const [viewStories, setViewStories] = useState(false);
    const [selectedRb, setSelectedRb] = useState(0);
    const [selectedCoreSoln, setSelectedCoreSoln] = useState({ key: 0, label: 'All', type: 'radius_all' });
    const [focused, setFocused] = useState(0);

    const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
    const center = {
        lat: 20.5937,
        lng: 78.9629
    };

    const mapOptions = {
        // disableDefaultUI: true,
        // zoomControl: false,
        mapTypeControl: false,
        streetViewControl: false,
        styles: MapConstants.NonGlobalMapStyle
    };

    const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
        setMap(mapInstance);
        (mapInstance as any).circles = [];
    }, []);

    const handleViewStories = (checked: boolean | ((prevState: boolean) => boolean)) => {
        setViewStories(checked);
    }

    const handleChangeRb = (event: { target: { value: any; }; }, option: Constants.Option) => {
        setSelectedRb(Number(event.target.value));
        setSelectedCoreSoln(option);
    };

    const getColorBasedOnPopulation = (population: number) => {
        if (population <= 100000) {
            return '#D4E2DB';
        } else if (population <= 5000000) {
            return '#83BFA1';
        } else if (population <= 10000000) {
            return '#429C6B';
        } else if (population <= 50000000) {
            return '#108041';
        } else {
            return '#D4E2DB';
        }
    };

    const clearCircles = () => {
        circles.forEach((circle) => circle.setMap(null));
        setCircles([]);
    };

    const handleFocused = (index: number) => {
        setFocused(index);
    }

    useEffect(() => {
        if (map && features) {
            map.data.forEach((feature) => {
                map.data.remove(feature);
            });
            map.data.addGeoJson(features);

            map.data.setStyle((feature) => {
                const population = feature.getProperty('population');
                const fillColor = getColorBasedOnPopulation(population);
                return {
                    fillColor,
                    fillOpacity: 0.7,
                    strokeColor: fillColor,
                    strokeWeight: 0.35,
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
            features.features.forEach((feature: Feature) => {
                processCoordinates(feature.geometry.coordinates);
            });

            // Set map center and zoom level based on bounding box
            map.fitBounds(bounds);
        }
    }, [map, features]);

    useEffect(() => {
        if (map && pointFeatures) {
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
                        // options: {
                        fillColor: '#FFFFFF',
                        fillOpacity: fillOpacity,
                        strokeColor: '#FFFFFF',
                        strokeOpacity: 1,
                        strokeWeight: 1,
                        zIndex: 100,
                        // },
                        map: map,
                    });
                });
            });

            setCircles(newCircles.flat());
        }
    }, [map, pointFeatures, selectedCoreSoln]);

    useEffect(() => {
        handleImportFeature();
        clearCircles();
    }, [selectedCountry, selectedState, selectedDistrict]);

    return (
        <div className='row'
            style={{ height: '81vh', width: '100vw', zIndex: 999 }}>
            <div className='col-9 p-0 h-100' style={{ position: 'relative' }}>
                {apiKey && (
                    <LoadScript
                        googleMapsApiKey={apiKey}
                    // libraries={["drawing", "visualization", "geometry", "places"]}
                    >
                        <GoogleMap
                            ref={mapRef}
                            zoom={6}
                            mapContainerStyle={MapConstants.containerStyle}
                            center={center}
                            onLoad={handleMapLoad}
                            options={mapOptions}
                        >
                            {Constants.storyFeatures && viewStories && (
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
                <CoreSolutions handleViewStories={handleViewStories} handleChangeRb={handleChangeRb} selectedRb={selectedRb} />
            </div>
            <div className='col-3 p-0 h-100'>
                <DistrictSideBar />
            </div>
        </div>
    )
}

export default StateMap;