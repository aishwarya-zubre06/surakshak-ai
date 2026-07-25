import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { Typography } from '@mui/material';
import 'leaflet/dist/leaflet.css';

const ThreatMap = () => {
  const center = [20.5937, 78.9629];
  const threatLocations = [
    { id: 1, lat: 28.6139, lng: 77.2090, risk: 'High', type: 'Phishing' },
    { id: 2, lat: 19.0760, lng: 72.8777, risk: 'Medium', type: 'QR Scam' },
    { id: 3, lat: 13.0827, lng: 80.2707, risk: 'Low', type: 'Harassment' },
    { id: 4, lat: 22.5726, lng: 88.3639, risk: 'High', type: 'Financial Fraud' },
    { id: 5, lat: 12.9716, lng: 77.5946, risk: 'Medium', type: 'Deepfake' },
  ];

  const getColor = (risk) => {
    if (risk === 'High') return '#ff6b6b';
    if (risk === 'Medium') return '#ffd93d';
    return '#6bcb77';
  };
  const getRadius = (risk) => {
    if (risk === 'High') return 20;
    if (risk === 'Medium') return 15;
    return 10;
  };

  return (
    <MapContainer center={center} zoom={5} style={{ height: '300px', width: '100%', borderRadius: '12px' }}>
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {threatLocations.map(loc => (
        <CircleMarker
          key={loc.id}
          center={[loc.lat, loc.lng]}
          radius={getRadius(loc.risk)}
          fillColor={getColor(loc.risk)}
          color={getColor(loc.risk)}
          weight={2}
          opacity={0.8}
          fillOpacity={0.6}
        >
          <Popup>
            <Typography variant="body2">
              <strong>{loc.type}</strong><br />
              Risk: {loc.risk}
            </Typography>
          </Popup>
        </CircleMarker>
      ))}
    </MapContainer>
  );
};

export default ThreatMap;