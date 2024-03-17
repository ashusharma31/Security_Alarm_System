import React from 'react';
import marker from './warning-icon.svg'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import 'leaflet/dist/leaflet.css';  
import L from 'leaflet';
import "./MapComponent.css";


const alarmWatchIcon = new L.Icon({
    iconUrl: marker, // Update this path to your icon's location
    iconSize: [35, 35], // Size of the icon
    iconAnchor:[51.505, -0.09], // Point of the icon which will correspond to marker's location
    popupAnchor: [0, -35], // Point from which the popup should open relative to the iconAnchor
  });
  
  


const MapComponent = ({ alarms }) => {
  const position = [51.505, -0.09]; // Default position, update based on your needs
  const navigate = useNavigate();
  const handleMarkerClick = (id, position) => {
    // Navigate to the site-specific dashboard and pass position as state
    navigate(`/site/${id}`, { state: { position } });
  };
  return (
    <MapContainer center={position} zoom={7} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {alarms.map((alarm, index) => (
        <Marker key={index}
         position={[alarm.location.lat, alarm.location.long]}
        icon={alarmWatchIcon}
        eventHandlers={{
            click: () => handleMarkerClick(alarm.towerId, alarm.location),
          }}
        >
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
