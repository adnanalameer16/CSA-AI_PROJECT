import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import { HeatmapData, GridCell } from '../../types';

interface HeatmapLayerProps {
  data: HeatmapData | null;
  visible: boolean;
}

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ data, visible }) => {
  const map = useMap();

  useEffect(() => {
    if (!data || !visible) return;

    // Clear existing heatmap layer
    map.eachLayer((layer) => {
      if (layer instanceof L.LayerGroup && (layer as any).isHeatmap) {
        map.removeLayer(layer);
      }
    });

    const heatmapLayer = L.layerGroup().addTo(map);
    (heatmapLayer as any).isHeatmap = true;

    // Create grid cells
    data.cells.forEach((cell: GridCell) => {
      const riskScore = cell.riskScore;
      const intensity = Math.min(riskScore / 10, 1); // Normalize to 0-1

      // Color based on risk score
      let color = '#4CAF50'; // Green for low risk
      if (intensity > 0.7) color = '#F44336'; // Red for high risk
      else if (intensity > 0.4) color = '#FF9800'; // Orange for medium risk

      const rectangle = L.rectangle(
        [
          [cell.latitude - data.gridSize / 2, cell.longitude - data.gridSize / 2],
          [cell.latitude + data.gridSize / 2, cell.longitude + data.gridSize / 2]
        ],
        {
          color: color,
          fillColor: color,
          fillOpacity: intensity * 0.6,
          weight: 1,
          opacity: 0.8
        }
      );

      // Add popup with cell information
      rectangle.bindPopup(`
        <div>
          <h4>Grid Cell (${cell.x}, ${cell.y})</h4>
          <p><strong>Hazard Count:</strong> ${cell.hazardCount}</p>
          <p><strong>Average Severity:</strong> ${cell.averageSeverity.toFixed(2)}</p>
          <p><strong>Risk Score:</strong> ${cell.riskScore.toFixed(2)}</p>
          <p><strong>Coordinates:</strong> ${cell.latitude.toFixed(4)}, ${cell.longitude.toFixed(4)}</p>
        </div>
      `);

      heatmapLayer.addLayer(rectangle);
    });

    return () => {
      map.removeLayer(heatmapLayer);
    };
  }, [map, data, visible]);

  return null;
};

export default HeatmapLayer;
