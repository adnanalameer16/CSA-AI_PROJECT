import { Hazard, HazardType, SeverityLevel, HazardStatus } from '../types';

export const sampleHazards: Hazard[] = [
  {
    id: '1',
    type: 'EARTHQUAKE',
    severity: 'HIGH',
    latitude: 40.7128,
    longitude: -74.0060,
    description: 'Major earthquake detected in New York area with magnitude 6.2',
    radius: 50,
    affectedArea: 7854,
    status: 'ACTIVE',
    createdAt: new Date('2024-01-15T10:30:00Z'),
    updatedAt: new Date('2024-01-15T10:30:00Z')
  },
  {
    id: '2',
    type: 'FLOOD',
    severity: 'MEDIUM',
    latitude: 40.7589,
    longitude: -73.9851,
    description: 'Flooding reported in Manhattan due to heavy rainfall and poor drainage',
    radius: 10,
    affectedArea: 314,
    status: 'ACTIVE',
    createdAt: new Date('2024-01-14T14:20:00Z'),
    updatedAt: new Date('2024-01-14T14:20:00Z')
  },
  {
    id: '3',
    type: 'FIRE',
    severity: 'CRITICAL',
    latitude: 40.7505,
    longitude: -73.9934,
    description: 'Wildfire spreading rapidly in Central Park area, multiple buildings at risk',
    radius: 5,
    affectedArea: 78,
    status: 'ACTIVE',
    createdAt: new Date('2024-01-16T08:45:00Z'),
    updatedAt: new Date('2024-01-16T08:45:00Z')
  },
  {
    id: '4',
    type: 'STORM',
    severity: 'HIGH',
    latitude: 40.6892,
    longitude: -74.0445,
    description: 'Severe thunderstorm with high winds, hail, and potential tornado activity',
    radius: 25,
    affectedArea: 1963,
    status: 'MONITORING',
    createdAt: new Date('2024-01-13T16:10:00Z'),
    updatedAt: new Date('2024-01-13T16:10:00Z')
  },
  {
    id: '5',
    type: 'LANDSLIDE',
    severity: 'MEDIUM',
    latitude: 40.6782,
    longitude: -73.9442,
    description: 'Landslide risk in Brooklyn Heights area due to soil erosion',
    radius: 2,
    affectedArea: 12,
    status: 'ACTIVE',
    createdAt: new Date('2024-01-12T11:15:00Z'),
    updatedAt: new Date('2024-01-12T11:15:00Z')
  },
  {
    id: '6',
    type: 'VOLCANIC',
    severity: 'LOW',
    latitude: 40.7614,
    longitude: -73.9776,
    description: 'Minor volcanic activity detected, monitoring for potential escalation',
    radius: 1,
    affectedArea: 3,
    status: 'MONITORING',
    createdAt: new Date('2024-01-11T09:30:00Z'),
    updatedAt: new Date('2024-01-11T09:30:00Z')
  },
  {
    id: '7',
    type: 'TSUNAMI',
    severity: 'HIGH',
    latitude: 40.6892,
    longitude: -74.0445,
    description: 'Tsunami warning issued for coastal areas, evacuation recommended',
    radius: 100,
    affectedArea: 31416,
    status: 'ACTIVE',
    createdAt: new Date('2024-01-10T07:20:00Z'),
    updatedAt: new Date('2024-01-10T07:20:00Z')
  },
  {
    id: '8',
    type: 'DROUGHT',
    severity: 'MEDIUM',
    latitude: 40.7505,
    longitude: -73.9934,
    description: 'Extended drought conditions affecting water supply and vegetation',
    radius: 200,
    affectedArea: 125664,
    status: 'ACTIVE',
    createdAt: new Date('2024-01-09T13:45:00Z'),
    updatedAt: new Date('2024-01-09T13:45:00Z')
  }
];
