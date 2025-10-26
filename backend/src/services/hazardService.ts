import { storage } from '../data/storage';
import { Hazard, CreateHazardRequest, UpdateHazardRequest, HazardFilters, HeatmapData, GridCell, MapBounds } from '../types';

export class HazardService {
  async getHazards(page = 1, limit = 10, filters: HazardFilters = {}) {
    return storage.getHazardsWithFilters({
      ...filters,
      page,
      limit
    });
  }

  async getHazardById(id: string): Promise<Hazard | null> {
    return storage.getHazardById(id) || null;
  }

  async createHazard(data: CreateHazardRequest): Promise<Hazard> {
    return storage.createHazard({
      ...data,
      status: data.status || 'ACTIVE'
    });
  }

  async updateHazard(id: string, data: UpdateHazardRequest): Promise<Hazard | null> {
    return storage.updateHazard(id, data) || null;
  }

  async deleteHazard(id: string): Promise<void> {
    const success = storage.deleteHazard(id);
    if (!success) {
      throw new Error('Hazard not found');
    }
  }

  async getHazardsInBounds(bounds: MapBounds): Promise<Hazard[]> {
    return storage.getHazardsInBounds(bounds);
  }

  async generateHeatmapData(bounds: MapBounds, gridSize = 0.01): Promise<HeatmapData> {
    return storage.generateHeatmapData(bounds, gridSize);
  }

  async updateGridCells(bounds: MapBounds, gridSize = 0.01): Promise<void> {
    storage.updateGridCells(bounds, gridSize);
  }

  async getGridCells(bounds: MapBounds): Promise<GridCell[]> {
    return storage.getGridCells(bounds);
  }
}
