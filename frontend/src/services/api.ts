import axios from 'axios';
import { Hazard, HeatmapData, GridCell, ApiResponse, PaginatedResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const hazardApi = {
  // Get all hazards with pagination
  getHazards: async (page = 1, limit = 10, filters?: any): Promise<PaginatedResponse<Hazard>> => {
    const response = await api.get('/hazards', {
      params: { page, limit, ...filters }
    });
    return response.data;
  },

  // Get hazard by ID
  getHazardById: async (id: string): Promise<Hazard> => {
    const response = await api.get(`/hazards/${id}`);
    return response.data.data;
  },

  // Create new hazard
  createHazard: async (hazardData: Omit<Hazard, 'id' | 'createdAt' | 'updatedAt'>): Promise<Hazard> => {
    const response = await api.post('/hazards', hazardData);
    return response.data.data;
  },

  // Update hazard
  updateHazard: async (id: string, hazardData: Partial<Hazard>): Promise<Hazard> => {
    const response = await api.put(`/hazards/${id}`, hazardData);
    return response.data.data;
  },

  // Delete hazard
  deleteHazard: async (id: string): Promise<void> => {
    await api.delete(`/hazards/${id}`);
  },

  // Get hazard grid data
  getHazardGrid: async (bounds: any, gridSize = 0.01): Promise<HeatmapData> => {
    const response = await api.get('/hazards/grid', {
      params: { ...bounds, gridSize }
    });
    return response.data.data;
  },

  // Get heatmap data
  getHeatmapData: async (bounds: any, gridSize = 0.01): Promise<HeatmapData> => {
    const response = await api.get('/hazards/heatmap', {
      params: { ...bounds, gridSize }
    });
    return response.data.data;
  },

  // Get hazards within bounds
  getHazardsInBounds: async (bounds: any): Promise<Hazard[]> => {
    const response = await api.get('/hazards/bounds', {
      params: bounds
    });
    return response.data.data;
  }
};

export default api;
