import { Hazard, GridCell, HeatmapData, MapBounds } from '../types';
import { sampleHazards } from './sampleData';

class InMemoryStorage {
  private hazards: Hazard[] = [...sampleHazards];
  private gridCells: GridCell[] = [];

  // Hazard operations
  getAllHazards(): Hazard[] {
    return [...this.hazards];
  }

  getHazardById(id: string): Hazard | undefined {
    return this.hazards.find(hazard => hazard.id === id);
  }

  createHazard(hazard: Omit<Hazard, 'id' | 'createdAt' | 'updatedAt'>): Hazard {
    const newHazard: Hazard = {
      ...hazard,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.hazards.push(newHazard);
    return newHazard;
  }

  updateHazard(id: string, updates: Partial<Hazard>): Hazard | undefined {
    const index = this.hazards.findIndex(hazard => hazard.id === id);
    if (index === -1) return undefined;

    this.hazards[index] = {
      ...this.hazards[index],
      ...updates,
      id: this.hazards[index].id, // Preserve original ID
      createdAt: this.hazards[index].createdAt, // Preserve original creation date
      updatedAt: new Date()
    };
    return this.hazards[index];
  }

  deleteHazard(id: string): boolean {
    const index = this.hazards.findIndex(hazard => hazard.id === id);
    if (index === -1) return false;
    
    this.hazards.splice(index, 1);
    return true;
  }

  getHazardsInBounds(bounds: MapBounds): Hazard[] {
    return this.hazards.filter(hazard => 
      hazard.latitude >= bounds.south &&
      hazard.latitude <= bounds.north &&
      hazard.longitude >= bounds.west &&
      hazard.longitude <= bounds.east
    );
  }

  // Grid operations
  generateHeatmapData(bounds: MapBounds, gridSize = 0.01): HeatmapData {
    const hazards = this.getHazardsInBounds(bounds);
    const cells: GridCell[] = [];
    const { north, south, east, west } = bounds;
    
    // Calculate grid dimensions
    const latSteps = Math.ceil((north - south) / gridSize);
    const lngSteps = Math.ceil((east - west) / gridSize);
    
    for (let i = 0; i < latSteps; i++) {
      for (let j = 0; j < lngSteps; j++) {
        const cellLat = south + (i * gridSize) + (gridSize / 2);
        const cellLng = west + (j * gridSize) + (gridSize / 2);
        
        // Find hazards within this cell
        const cellHazards = hazards.filter(hazard => {
          const latDiff = Math.abs(hazard.latitude - cellLat);
          const lngDiff = Math.abs(hazard.longitude - cellLng);
          return latDiff <= gridSize / 2 && lngDiff <= gridSize / 2;
        });
        
        if (cellHazards.length > 0) {
          const hazardCount = cellHazards.length;
          const severityValues = cellHazards.map(h => {
            switch (h.severity) {
              case 'LOW': return 1;
              case 'MEDIUM': return 2;
              case 'HIGH': return 3;
              case 'CRITICAL': return 4;
              default: return 0;
            }
          });
          
          const averageSeverity = severityValues.reduce((sum: number, val: number) => sum + val, 0) / severityValues.length;
          const riskScore = hazardCount * averageSeverity;
          
          cells.push({
            id: `${i}-${j}`,
            x: i,
            y: j,
            latitude: cellLat,
            longitude: cellLng,
            hazardCount,
            averageSeverity,
            riskScore,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      }
    }
    
    return {
      cells,
      bounds,
      gridSize
    };
  }

  getGridCells(bounds: MapBounds): GridCell[] {
    return this.gridCells.filter(cell =>
      cell.latitude >= bounds.south &&
      cell.latitude <= bounds.north &&
      cell.longitude >= bounds.west &&
      cell.longitude <= bounds.east
    );
  }

  updateGridCells(bounds: MapBounds, gridSize = 0.01): void {
    const heatmapData = this.generateHeatmapData(bounds, gridSize);
    
    // Clear existing grid cells in this area
    this.gridCells = this.gridCells.filter(cell => 
      !(cell.latitude >= bounds.south &&
        cell.latitude <= bounds.north &&
        cell.longitude >= bounds.west &&
        cell.longitude <= bounds.east)
    );
    
    // Add new grid cells
    this.gridCells.push(...heatmapData.cells);
  }

  // Utility methods
  private generateId(): string {
    return Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  }

  // Filtering and pagination
  getHazardsWithFilters(filters: {
    type?: string;
    severity?: string;
    status?: string;
    search?: string;
    page?: number;
    limit?: number;
  }) {
    let filteredHazards = [...this.hazards];

    // Apply filters
    if (filters.type) {
      filteredHazards = filteredHazards.filter(h => h.type === filters.type);
    }
    if (filters.severity) {
      filteredHazards = filteredHazards.filter(h => h.severity === filters.severity);
    }
    if (filters.status) {
      filteredHazards = filteredHazards.filter(h => h.status === filters.status);
    }
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredHazards = filteredHazards.filter(h => 
        h.description.toLowerCase().includes(searchLower) ||
        h.type.toLowerCase().includes(searchLower)
      );
    }

    // Sort by creation date (newest first)
    filteredHazards.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    // Apply pagination
    const page = filters.page || 1;
    const limit = filters.limit || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;

    return {
      data: filteredHazards.slice(startIndex, endIndex),
      total: filteredHazards.length,
      page,
      limit,
      totalPages: Math.ceil(filteredHazards.length / limit)
    };
  }
}

// Export singleton instance
export const storage = new InMemoryStorage();
