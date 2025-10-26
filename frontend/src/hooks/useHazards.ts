import { useState, useEffect, useCallback } from 'react';
import { hazardApi } from '../services/api';
import { Hazard, HeatmapData, PaginatedResponse } from '../types';

export const useHazards = (page = 1, limit = 10, filters?: any) => {
  const [hazards, setHazards] = useState<Hazard[]>([]);
  useEffect(() => {
    // Ensure hazards is always an array
    if (!Array.isArray(hazards)) {
      setHazards([]);
    }
  }, [hazards]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0
  });

  const fetchHazards = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response: PaginatedResponse<Hazard> = await hazardApi.getHazards(page, limit, filters);
      setHazards(Array.isArray(response.data) ? response.data : []);
      setPagination({
        total: response.total,
        page: response.page,
        limit: response.limit,
        totalPages: response.totalPages
      });
    } catch (err: any) {
      setError(err.message || 'Failed to fetch hazards');
      setHazards([]);
    } finally {
      setLoading(false);
    }
  }, [page, limit, filters]);

  useEffect(() => {
    fetchHazards();
  }, [fetchHazards]);

  const createHazard = async (hazardData: Omit<Hazard, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newHazard = await hazardApi.createHazard(hazardData);
      setHazards(prev => [newHazard, ...prev]);
      return newHazard;
    } catch (err: any) {
      setError(err.message || 'Failed to create hazard');
      throw err;
    }
  };

  const updateHazard = async (id: string, hazardData: Partial<Hazard>) => {
    try {
      const updatedHazard = await hazardApi.updateHazard(id, hazardData);
      setHazards(prev => prev.map(h => h.id === id ? updatedHazard : h));
      return updatedHazard;
    } catch (err: any) {
      setError(err.message || 'Failed to update hazard');
      throw err;
    }
  };

  const deleteHazard = async (id: string) => {
    try {
      await hazardApi.deleteHazard(id);
      setHazards(prev => prev.filter(h => h.id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete hazard');
      throw err;
    }
  };

  return {
    hazards,
    loading,
    error,
    pagination,
    fetchHazards,
    createHazard,
    updateHazard,
    deleteHazard
  };
};

export const useHeatmapData = (bounds: any, gridSize = 0.01) => {
  const [heatmapData, setHeatmapData] = useState<HeatmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHeatmapData = useCallback(async () => {
    if (!bounds) return;
    
    setLoading(true);
    setError(null);
    try {
      const data = await hazardApi.getHeatmapData(bounds, gridSize);
      setHeatmapData(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch heatmap data');
    } finally {
      setLoading(false);
    }
  }, [bounds, gridSize]);

  useEffect(() => {
    fetchHeatmapData();
  }, [fetchHeatmapData]);

  return {
    heatmapData,
    loading,
    error,
    refetch: fetchHeatmapData
  };
};
