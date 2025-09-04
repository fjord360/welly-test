'use client';
import React from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { RMap, RMarker } from "maplibre-react-components";

const MapComponent: React.FC = () => {
  const mountain: [number, number] = [115.2, -8.4];

  return (
    <RMap
      minZoom={7}
      initialCenter={mountain}
      initialZoom={8}
      mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
    >
			<RMarker longitude={115.26} latitude={-8.5} />
			<RMarker longitude={115.16} latitude={-8.74} />
		</RMap>
  );
};

export default MapComponent;