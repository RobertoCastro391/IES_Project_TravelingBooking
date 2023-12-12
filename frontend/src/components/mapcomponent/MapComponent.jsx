import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
// Import Leaflet styles
import 'leaflet/dist/leaflet.css';



const MapComponent = ({ coordinates, zoom }) => {
  return (
    <MapContainer center={coordinates} zoom={zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={coordinates}>
        <Popup>Marker Popup</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
