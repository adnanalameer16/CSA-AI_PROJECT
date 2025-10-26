export interface Hazard {
  id: string;
  type: HazardType;
  severity: SeverityLevel;
  latitude: number;
  longitude: number;
  description: string;
  radius?: number;
  affectedArea?: number;
  status: HazardStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type HazardType = 
  | 'EARTHQUAKE'
  | 'FLOOD'
  | 'FIRE'
  | 'LANDSLIDE'
  | 'STORM'
  | 'VOLCANIC'
  | 'TSUNAMI'
  | 'DROUGHT'
  | 'OTHER';

export type SeverityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export type HazardStatus = 'ACTIVE' | 'RESOLVED' | 'MONITORING';

export interface GridCell {
  id: string;
  x: number;
  y: number;
  latitude: number;
  longitude: number;
  hazardCount: number;
  averageSeverity: number;
  riskScore: number;
  createdAt: Date;
  updatedAt: Date;
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

export interface CreateHazardRequest {
  type: HazardType;
  severity: SeverityLevel;
  latitude: number;
  longitude: number;
  description: string;
  radius?: number;
  affectedArea?: number;
  status?: HazardStatus;
}

export interface UpdateHazardRequest {
  type?: HazardType;
  severity?: SeverityLevel;
  latitude?: number;
  longitude?: number;
  description?: string;
  radius?: number;
  affectedArea?: number;
  status?: HazardStatus;
}

export interface HazardFilters {
  type?: HazardType;
  severity?: SeverityLevel;
  status?: HazardStatus;
  bounds?: MapBounds;
  search?: string;
}
