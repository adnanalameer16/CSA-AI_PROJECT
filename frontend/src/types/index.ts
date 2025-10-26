export interface Hazard {
  id: string;
  type: HazardType;
  severity: SeverityLevel;
  latitude: number;
  longitude: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  radius?: number;
  affectedArea?: number;
  status: HazardStatus;
}

export type HazardType = 
  | 'earthquake'
  | 'flood'
  | 'fire'
  | 'landslide'
  | 'storm'
  | 'volcanic'
  | 'tsunami'
  | 'drought'
  | 'other';

export type SeverityLevel = 'low' | 'medium' | 'high' | 'critical';

export type HazardStatus = 'active' | 'resolved' | 'monitoring';

export interface GridCell {
  id: string;
  x: number;
  y: number;
  latitude: number;
  longitude: number;
  hazardCount: number;
  averageSeverity: number;
  riskScore: number;
}

export interface HeatmapData {
  cells: GridCell[];
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  gridSize: number;
}

export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
