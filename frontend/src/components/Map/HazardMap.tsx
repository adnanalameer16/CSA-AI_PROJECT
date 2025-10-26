import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Hazard, SeverityLevel } from '../../types';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

interface HazardMapProps {
  hazards: Hazard[];
  center: [number, number];
  zoom: number;
  onHazardClick?: (hazard: Hazard) => void;
  onMapMove?: (bounds: any) => void;
  height?: string;
  children?: React.ReactNode;
}

const MapController: React.FC<{ onMapMove: (bounds: any) => void }> = ({ onMapMove }) => {
  const map = useMap();

  useEffect(() => {
    const handleMoveEnd = () => {
      const bounds = map.getBounds();
      onMapMove({
        north: bounds.getNorth(),
        south: bounds.getSouth(),
        east: bounds.getEast(),
        west: bounds.getWest()
      });
    };

    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map, onMapMove]);

  return null;
};

const getSeverityColor = (severity: SeverityLevel): string => {
  switch (severity) {
    case 'low': return '#4CAF50';
    case 'medium': return '#FF9800';
    case 'high': return '#F44336';
    case 'critical': return '#9C27B0';
    default: return '#757575';
  }
};

const getSeverityIcon = (severity: SeverityLevel) => {
  const color = getSeverityColor(severity);
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      background-color: ${color};
      width: 20px;
      height: 20px;
      border-radius: 50%;
      border: 2px solid white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const HazardMap: React.FC<HazardMapProps> = ({
  hazards,
  center,
  zoom,
  onHazardClick,
  onMapMove,
  height = '500px',
  children
}) => {
  return (
    <div style={{ height, width: '100%' }}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {onMapMove && <MapController onMapMove={onMapMove} />}
        {children}
        {Array.isArray(hazards) && hazards.map((hazard) => (
          <Marker
            key={hazard.id}
            position={[hazard.latitude, hazard.longitude]}
            icon={getSeverityIcon(hazard.severity)}
            eventHandlers={{
              click: () => onHazardClick?.(hazard)
            }}
          >
            <Popup>
              <div>
                <h3>{hazard.type.charAt(0).toUpperCase() + hazard.type.slice(1)}</h3>
                <p><strong>Severity:</strong> {hazard.severity}</p>
                <p><strong>Status:</strong> {hazard.status}</p>
                <p><strong>Description:</strong> {hazard.description}</p>
                <p><strong>Created:</strong> {new Date(hazard.createdAt).toLocaleDateString()}</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default HazardMap;
