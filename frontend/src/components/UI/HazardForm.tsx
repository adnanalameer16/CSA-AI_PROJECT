import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Box
} from '@mui/material';
import { Hazard, HazardType, SeverityLevel, HazardStatus } from '../../types';

interface HazardFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (hazardData: Omit<Hazard, 'id' | 'createdAt' | 'updatedAt'>) => void;
  initialData?: Partial<Hazard>;
  title?: string;
}

const HazardForm: React.FC<HazardFormProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  title = 'Add New Hazard'
}) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || 'earthquake' as HazardType,
    severity: initialData?.severity || 'low' as SeverityLevel,
    latitude: initialData?.latitude || 0,
    longitude: initialData?.longitude || 0,
    description: initialData?.description || '',
    radius: initialData?.radius || 0,
    affectedArea: initialData?.affectedArea || 0,
    status: initialData?.status || 'active' as HazardStatus
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.type) newErrors.type = 'Hazard type is required';
    if (!formData.severity) newErrors.severity = 'Severity level is required';
    if (formData.latitude < -90 || formData.latitude > 90) {
      newErrors.latitude = 'Latitude must be between -90 and 90';
    }
    if (formData.longitude < -180 || formData.longitude > 180) {
      newErrors.longitude = 'Longitude must be between -180 and 180';
    }
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.radius < 0) newErrors.radius = 'Radius must be non-negative';
    if (formData.affectedArea < 0) newErrors.affectedArea = 'Affected area must be non-negative';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
      onClose();
    }
  };

  const handleChange = (field: string) => (event: any) => {
    const value = event.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: field === 'latitude' || field === 'longitude' || field === 'radius' || field === 'affectedArea'
        ? parseFloat(value) || 0
        : value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const hazardTypes: HazardType[] = [
    'earthquake', 'flood', 'fire', 'landslide', 'storm', 
    'volcanic', 'tsunami', 'drought', 'other'
  ];

  const severityLevels: SeverityLevel[] = ['low', 'medium', 'high', 'critical'];
  const statusOptions: HazardStatus[] = ['active', 'resolved', 'monitoring'];

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.type}>
                <InputLabel>Hazard Type</InputLabel>
                <Select
                  value={formData.type}
                  onChange={handleChange('type')}
                  label="Hazard Type"
                >
                  {hazardTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.severity}>
                <InputLabel>Severity Level</InputLabel>
                <Select
                  value={formData.severity}
                  onChange={handleChange('severity')}
                  label="Severity Level"
                >
                  {severityLevels.map((level) => (
                    <MenuItem key={level} value={level}>
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Latitude"
                type="number"
                value={formData.latitude}
                onChange={handleChange('latitude')}
                error={!!errors.latitude}
                helperText={errors.latitude}
                inputProps={{ min: -90, max: 90, step: 0.0001 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Longitude"
                type="number"
                value={formData.longitude}
                onChange={handleChange('longitude')}
                error={!!errors.longitude}
                helperText={errors.longitude}
                inputProps={{ min: -180, max: 180, step: 0.0001 }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                multiline
                rows={3}
                value={formData.description}
                onChange={handleChange('description')}
                error={!!errors.description}
                helperText={errors.description}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Radius (km)"
                type="number"
                value={formData.radius}
                onChange={handleChange('radius')}
                error={!!errors.radius}
                helperText={errors.radius}
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Affected Area (km²)"
                type="number"
                value={formData.affectedArea}
                onChange={handleChange('affectedArea')}
                error={!!errors.affectedArea}
                helperText={errors.affectedArea}
                inputProps={{ min: 0, step: 0.1 }}
              />
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  onChange={handleChange('status')}
                  label="Status"
                >
                  {statusOptions.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default HazardForm;
