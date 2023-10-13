import { atom } from 'recoil';

export interface geoJSONProps {
    type: string;
    features: any;
    legendProperties: any;
}

const geoJsonState = atom({
    key: 'geojson',
    default: {} as geoJSONProps
});

export { geoJsonState };