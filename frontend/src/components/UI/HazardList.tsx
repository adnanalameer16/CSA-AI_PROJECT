import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Chip,
  IconButton,
  Box,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  Warning as WarningIcon,
  Info as InfoIcon
} from '@mui/icons-material';
import { Hazard, SeverityLevel } from '../../types';
import HazardForm from './HazardForm';

interface HazardListProps {
  hazards: Hazard[];
  onEdit: (hazard: Hazard) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const HazardList: React.FC<HazardListProps> = ({
  hazards,
  onEdit,
  onDelete,
  loading = false
}) => {
  const [selectedHazard, setSelectedHazard] = useState<Hazard | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [hazardToDelete, setHazardToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getSeverityColor = (severity: SeverityLevel): 'success' | 'warning' | 'error' | 'default' => {
    switch (severity) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      case 'critical': return 'error';
      default: return 'default';
    }
  };

  const getStatusColor = (status: string): 'error' | 'success' | 'info' | 'default' => {
    switch (status) {
      case 'active': return 'error';
      case 'resolved': return 'success';
      case 'monitoring': return 'info';
      default: return 'default';
    }
  };

  const filteredHazards = hazards.filter(hazard =>
    hazard.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hazard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hazard.severity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (hazardId: string) => {
    setHazardToDelete(hazardId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (hazardToDelete) {
      onDelete(hazardToDelete);
      setDeleteDialogOpen(false);
      setHazardToDelete(null);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" p={3}>
        <Typography>Loading hazards...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search hazards..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <InfoIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={2}>
        {filteredHazards.map((hazard) => (
          <Grid item xs={12} md={6} lg={4} key={hazard.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                  <Typography variant="h6" component="h2" noWrap>
                    {hazard.type.charAt(0).toUpperCase() + hazard.type.slice(1)}
                  </Typography>
                  <Box>
                    <IconButton
                      size="small"
                      onClick={() => onEdit(hazard)}
                      sx={{ mr: 0.5 }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDeleteClick(hazard.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>

                <Box display="flex" gap={1} mb={1}>
                  <Chip
                    label={hazard.severity}
                    color={getSeverityColor(hazard.severity)}
                    size="small"
                  />
                  <Chip
                    label={hazard.status}
                    color={getStatusColor(hazard.status)}
                    size="small"
                  />
                </Box>

                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    mb: 1
                  }}
                >
                  {hazard.description}
                </Typography>

                <Box display="flex" alignItems="center" gap={1} mb={1}>
                  <LocationIcon fontSize="small" color="action" />
                  <Typography variant="body2" color="text.secondary">
                    {hazard.latitude.toFixed(4)}, {hazard.longitude.toFixed(4)}
                  </Typography>
                </Box>

                {hazard.radius && hazard.radius > 0 && (
                  <Box display="flex" alignItems="center" gap={1} mb={1}>
                    <WarningIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                      Radius: {hazard.radius} km
                    </Typography>
                  </Box>
                )}

                <Typography variant="caption" color="text.secondary">
                  Created: {new Date(hazard.createdAt).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {filteredHazards.length === 0 && !loading && (
        <Box textAlign="center" py={4}>
          <Typography variant="h6" color="text.secondary">
            No hazards found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {searchTerm ? 'Try adjusting your search terms' : 'Add a new hazard to get started'}
          </Typography>
        </Box>
      )}

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Hazard</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this hazard? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HazardList;
