import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { HeatmapData } from '../../types';

interface GridLayerProps {
  data: HeatmapData | null;
  visible: boolean;
  showLabels?: boolean;
}

const GridLayer: React.FC<GridLayerProps> = ({ data, visible, showLabels = false }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || !visible) return;

    // Clear existing grid layer
    map.eachLayer((layer) => {
      if (layer instanceof L.LayerGroup && (layer as any).isGrid) {
        map.removeLayer(layer);
      }
    });

    const gridLayer = L.layerGroup().addTo(map);
    (gridLayer as any).isGrid = true;

    // Create grid lines
    const { north, south, east, west } = data.bounds;
    const gridSize = data.gridSize;

    // Vertical lines
    for (let lng = west; lng <= east; lng += gridSize) {
      const line = L.polyline(
        [
          [north, lng],
          [south, lng]
        ],
        {
          color: '#666',
          weight: 1,
          opacity: 0.5,
          dashArray: '5, 5'
        }
      );
      gridLayer.addLayer(line);
    }

    // Horizontal lines
    for (let lat = south; lat <= north; lat += gridSize) {
      const line = L.polyline(
        [
          [lat, west],
          [lat, east]
        ],
        {
          color: '#666',
          weight: 1,
          opacity: 0.5,
          dashArray: '5, 5'
        }
      );
      gridLayer.addLayer(line);
    }

    // Add grid labels if requested
    if (showLabels) {
      data.cells.forEach((cell) => {
        const label = L.marker([cell.latitude, cell.longitude], {
          icon: L.divIcon({
            className: 'grid-label',
            html: `<div style="
              background: rgba(255, 255, 255, 0.8);
              border: 1px solid #666;
              border-radius: 3px;
              padding: 2px 4px;
              font-size: 10px;
              font-weight: bold;
              text-align: center;
              min-width: 20px;
            ">${cell.x},${cell.y}</div>`,
            iconSize: [30, 15],
            iconAnchor: [15, 7.5]
          })
        });
        gridLayer.addLayer(label);
      });
    }

    return () => {
      map.removeLayer(gridLayer);
    };
  }, [map, data, visible, showLabels]);

  return null;
};

export default GridLayer;
