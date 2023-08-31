import React from 'react';
import { Source, Layer } from 'react-map-gl';

interface MapFillLayerProps {
    features: any; // Adjust the type of 'features' based on your data structure
}

const MapFillLayer: React.FC<MapFillLayerProps> = ({ features }) => {
    return (
        <>
            <Source id='geojsonsource-fill' type='geojson' data={features} />
            <Layer
                id='map-fill-layer'
                type='fill'
                source='geojsonsource-fill'
                paint={{
                    'fill-color': [
                        'case',
                        ['<=', ['get', 'population'], 100000],
                        '#D4E2DB',
                        ['<=', ['get', 'population'], 5000000],
                        '#83BFA1',
                        ['<=', ['get', 'population'], 10000000],
                        '#429C6B',
                        ['<=', ['get', 'population'], 50000000],
                        '#108041',
                        '#D4E2DB',
                    ],
                    'fill-opacity': 0.7,
                }}
            />
        </>
    );
};

export default MapFillLayer;
