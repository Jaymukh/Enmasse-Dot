import '../../App.css'
import 'mapbox-gl/dist/mapbox-gl.css';
import React, { useState } from 'react';
import GlobalMap from './GlobalMap';
import axios from 'axios';
import * as turf from '@turf/turf';
import StateMap from './StateMap';

interface MapProps {
    global: boolean;
    selectedCountry: string;
    selectedCountryCode: string;
    selectedState: string;
    selectedDistrict: string;
}

const Map: React.FC<MapProps> =({
    global,
    selectedCountry,
    selectedCountryCode,
    selectedState,
    selectedDistrict,
}) => {
    const [features, setFeatures] = useState<any>();
    const [pointFeatures, setPointFeatures] = useState<any[]>([]); // Same here

    const handleImportFeature = async (code: string | undefined) => {
        try {
            if (code) {
                const module = await import('../../utils/json/geojson/countries/' + code + '.geo.json');
                setFeatures(module.default);
            } else {
                if (!selectedState && selectedCountry) {
                    const module = await import(
                        '../../utils/json/geojson/countries/' + selectedCountryCode + '.geo.json'
                    );
                    setFeatures(module.default);
                    const pointFeatures = module.default.features.map((feature: any) => {
                        const centroid = turf.centroid(feature);
                        return turf.point(centroid.geometry.coordinates, feature.properties);
                    });
                    setPointFeatures(pointFeatures);
                } else if (!selectedDistrict && selectedState) {
                    const state = selectedState.toUpperCase();
                    const module = await import(
                        '../../utils/json/geojson/states/' + state + '_STATE.geojson'
                    );
                    const response = await axios.get(module.default);
                    const data = response.data;

                    setFeatures(data);
                } else if (selectedDistrict) {
                    const district = selectedDistrict.toUpperCase();
                    const module = await import(
                        '../../../utils/json/geojson/districts/' + district + '.geojson'
                    );
                    const response = await axios.get(module.default);
                    const data = response.data;
                    setFeatures(data);
                }
            }
        } catch (error) {
            console.error('Error importing file', error);
        }
    };

    return (
        <div>
            {global ? (
                <GlobalMap
                    features={features}
                    handleImportFeature={handleImportFeature}
                    />
            ) : (
                <StateMap
                    features={features}
                    handleImportFeature={handleImportFeature}
                    selectedCountry={selectedCountry}
                    selectedState={selectedState}
                    selectedDistrict={selectedDistrict}
                    pointFeatures={pointFeatures}
                />
            )}
        </div>
    );
}

export default Map;
