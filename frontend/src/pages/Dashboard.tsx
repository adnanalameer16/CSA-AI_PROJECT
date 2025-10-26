import React, { useState, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Chip,
  IconButton,
  Fab
} from '@mui/material';
import {
  Add as AddIcon,
  Map as MapIcon,
  GridOn as GridIcon,
  HeatPump as HeatmapIcon,
  List as ListIcon
} from '@mui/icons-material';
import HazardMap from '../components/Map/HazardMap';
import HeatmapLayer from '../components/Map/HeatmapLayer';
import GridLayer from '../components/Map/GridLayer';
import HazardList from '../components/UI/HazardList';
import HazardForm from '../components/UI/HazardForm';
import { useHazards, useHeatmapData } from '../hooks/useHazards';
import { Hazard, MapBounds } from '../types';

const Dashboard: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [showGrid, setShowGrid] = useState(false);
  const [showGridLabels, setShowGridLabels] = useState(false);
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingHazard, setEditingHazard] = useState<Hazard | null>(null);
  const [mapBounds, setMapBounds] = useState<MapBounds>({
    north: 40.7,
    south: 40.5,
    east: -74.0,
    west: -74.2
  });

  const { hazards, loading, createHazard, updateHazard, deleteHazard } = useHazards();
  const { heatmapData, loading: heatmapLoading } = useHeatmapData(mapBounds, 0.01);

  const handleMapMove = (bounds: MapBounds) => {
    setMapBounds(bounds);
  };

  const handleHazardClick = (hazard: Hazard) => {
    setSelectedHazard(hazard);
  };

  const handleAddHazard = () => {
    setEditingHazard(null);
    setFormOpen(true);
  };

  const handleEditHazard = (hazard: Hazard) => {
    setEditingHazard(hazard);
    setFormOpen(true);
  };

  const handleFormSubmit = async (hazardData: Omit<Hazard, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      if (editingHazard) {
        await updateHazard(editingHazard.id, hazardData);
      } else {
        await createHazard(hazardData);
      }
      setFormOpen(false);
      setEditingHazard(null);
    } catch (error) {
      console.error('Error saving hazard:', error);
    }
  };

  const handleDeleteHazard = async (id: string) => {
    try {
      await deleteHazard(id);
    } catch (error) {
      console.error('Error deleting hazard:', error);
    }
  };

  const getSeverityStats = () => {
    if (!Array.isArray(hazards)) return {};
    const stats = hazards.reduce((acc, hazard) => {
      acc[hazard.severity] = (acc[hazard.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    return stats;
  };

  const severityStats = getSeverityStats();

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Hazard Map Generator
        </Typography>
        <Box display="flex" gap={2} alignItems="center">
          <ToggleButtonGroup
            value={viewMode}
            exclusive
            onChange={(_, value) => value && setViewMode(value)}
            size="small"
          >
            <ToggleButton value="map">
              <MapIcon sx={{ mr: 1 }} />
              Map
            </ToggleButton>
            <ToggleButton value="list">
              <ListIcon sx={{ mr: 1 }} />
              List
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Box>

      {/* Controls */}
      {viewMode === 'map' && (
        <Paper sx={{ p: 2, mb: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={showHeatmap}
                    onChange={(e) => setShowHeatmap(e.target.checked)}
                  />
                }
                label="Heatmap"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={
                  <Switch
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                  />
                }
                label="Grid"
              />
            </Grid>
            {showGrid && (
              <Grid item>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showGridLabels}
                      onChange={(e) => setShowGridLabels(e.target.checked)}
                    />
                  }
                  label="Grid Labels"
                />
              </Grid>
            )}
          </Grid>
        </Paper>
      )}

      {/* Statistics Cards */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Hazards
              </Typography>
              <Typography variant="h4">
                {Array.isArray(hazards) ? hazards.length : 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        {Object.entries(severityStats).map(([severity, count]) => (
          <Grid item xs={12} sm={6} md={3} key={severity}>
            <Card>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {severity.charAt(0).toUpperCase() + severity.slice(1)} Severity
                </Typography>
                <Typography variant="h4">
                  {count}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Main Content */}
      <Grid container spacing={2}>
        {viewMode === 'map' ? (
          <Grid item xs={12}>
            <Paper sx={{ height: '600px', overflow: 'hidden' }}>
              <HazardMap
                hazards={hazards || []}
                center={[40.6, -74.1]}
                zoom={10}
                onHazardClick={handleHazardClick}
                onMapMove={handleMapMove}
                height="600px"
              >
                {showHeatmap && heatmapData && (
                  <HeatmapLayer data={heatmapData} visible={showHeatmap} />
                )}
                {showGrid && heatmapData && (
                  <GridLayer 
                    data={heatmapData} 
                    visible={showGrid} 
                    showLabels={showGridLabels}
                  />
                )}
              </HazardMap>
            </Paper>
          </Grid>
        ) : (
          <Grid item xs={12}>
            <HazardList
              hazards={hazards}
              onEdit={handleEditHazard}
              onDelete={handleDeleteHazard}
              loading={loading}
            />
          </Grid>
        )}
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        aria-label="add"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleAddHazard}
      >
        <AddIcon />
      </Fab>

      {/* Hazard Form Dialog */}
      <HazardForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingHazard(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingHazard || undefined}
        title={editingHazard ? 'Edit Hazard' : 'Add New Hazard'}
      />
    </Box>
  );
};

export default Dashboard;
