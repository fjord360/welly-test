"use client";
import React, { useState } from "react";
import "maplibre-gl/dist/maplibre-gl.css";
import { RLayer, RMap, RMarker, RSource } from "maplibre-react-components";

const MapComponent: React.FC = () => {
  const mapCenter: [number, number] = [24.5, 64.0];

  const markers = [
    [
      { lng: 24.95, lat: 60.32 },
      { lng: 24.858, lat: 67.696 },
    ],
    [
      { lng: 24.858, lat: 67.696 },
      { lng: 25.73, lat: 66.5 },
    ],
    [
      { lng: 25.73, lat: 66.5 },
      { lng: 24.95, lat: 60.32 },
    ],
  ];

  // 선의 좌표 데이터 (GeoJSON 형식)
  const getLineData = (markerIndex: number) => ({
    type: "FeatureCollection" as const,
    features: [
      {
        type: "Feature" as const,
        geometry: {
          type: "LineString" as const,
          coordinates: markers[markerIndex].map((marker) => [
            marker.lng,
            marker.lat,
          ]),
        },
        properties: {},
      },
    ],
  });

  const lineStyle = {
    "line-color": "#3887be",
    "line-width": 5,
    "line-opacity": 0.75,
  };

  const [selectedButton, setSelectedButton] = useState(1);
  const buttons = [1, 2, 3];

  const handleButtonClick = (number: number) => {
    setSelectedButton(number);
  };

  return (
    <div>
      <div className="space-y-6">
        <div className="bg-white pb-6 rounded-lg">
          <p className="font-medium text-gray-900 text-sm">
            Helsinki {">"} Kittilä (항공)
          </p>
          <p className="font-medium text-gray-900 text-sm">
            Kittilä {">"} Rovaniemi (버스)
          </p>
          <p className="font-medium text-gray-900 text-sm">
            Rovaniemi {">"} Helsinki (야간기차)
          </p>
        </div>
      </div>

      <div className="w-full h-[420px]">
        <RMap
          minZoom={3}
          initialCenter={mapCenter}
          initialZoom={3.5}
          mapStyle="https://openmaptiles.geo.data.gouv.fr/styles/osm-bright/style.json"
        >
          {markers[selectedButton - 1].map((marker, idx) => (
            <RMarker key={idx} longitude={marker.lng} latitude={marker.lat} />
          ))}
          <RSource
            id="route-source"
            type="geojson"
            data={getLineData(selectedButton - 1)}
          />
          <RLayer
            source="route-source"
            id="route-line"
            type="line"
            paint={lineStyle}
          />
        </RMap>
        <div className="flex items-center mt-4 gap-2">
          {buttons.map((number) => (
            <button
              key={number}
              onClick={() => handleButtonClick(number)}
              className={`
							w-[32px] h-[32px] rounded-full font-semibold text-sm transition-all duration-200
							${
                selectedButton === number
                  ? "bg-primary text-white shadow-lg transform scale-105"
                  : "bg-blue-50 text-primary hover:bg-gray-200 hover:shadow-md"
              }
						`}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
