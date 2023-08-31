import React from 'react';
import { Source, Layer } from 'react-map-gl';

interface MapCircleLayerProps {
  selected: boolean;
  type: string;
  features: any; // Replace 'any' with the appropriate type for your features
  properties: {
    sourceId: string;
    layerId: string;
    circleColor: string;
    circleStrokeWidth: number;
    circleStrokeColor: string;
  };
}

const MapCircleLayer: React.FC<MapCircleLayerProps> = ({
  selected,
  type,
  features,
  properties,
}) => {
  const opacity = selected && type === 'radius-all' ? 0 : 0.5;

  return (
    <>
      <Source id={properties.sourceId} type="geojson" data={features} />
      <Layer
        id={properties.layerId}
        type="circle"
        source={properties.sourceId}
        paint={{
          'circle-radius': ['get', type],
          'circle-color': properties.circleColor,
          'circle-opacity': opacity,
          'circle-stroke-width': properties.circleStrokeWidth,
          'circle-stroke-color': properties.circleStrokeColor,
        }}
      />
    </>
  );
};

export default MapCircleLayer;
