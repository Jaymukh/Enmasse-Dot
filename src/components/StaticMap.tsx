import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import * as MapConstants from './../utils/json/googlemapstyle';
import axios from 'axios';
import * as turf from '@turf/turf';
import * as d3 from 'd3';

const StaticMap: React.FC = () => {
  const [geoJSON, setGeoJSON] = useState<any>(null); // Change 'any' to the actual GeoJSON type if available
  const [center, setCenter] = useState({ lat: 20.5937, lng: 78.9629 });

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: false,
    styles: MapConstants.staticMapStyle,
  };

  const loadGeoJSON = async (map: google.maps.Map) => {
    try {
      const module = await import('./../utils/json/geojson/countries/IN.geo.json');
      const data = module.default;
      console.log(data);
      setGeoJSON(data);
      map.data.forEach((feature) => {
        map.data.remove(feature);
      });
      map.data.addGeoJson(data);
      setFeatureStyle(map);
    } catch (error) {
      console.error('Error importing file', error);
    }
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

  const setFeatureStyle = (map: google.maps.Map) => {
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
  };

  const handleMapLoad = useCallback((mapInstance: google.maps.Map) => {
    loadGeoJSON(mapInstance);
  }, []);

  return (
    <div style={{ height: '100%', width: '100%' }} className='d-flex flex-column align-items-center justify-content-center'>
      <LoadScript googleMapsApiKey={MapConstants.googleMapsApiKey}>
        <GoogleMap
          zoom={3.5}
          mapContainerStyle={MapConstants.containerStyle}
          center={center}
          onLoad={handleMapLoad}
          options={mapOptions}
        />
      </LoadScript>
    </div>
  );
};

export default StaticMap;
