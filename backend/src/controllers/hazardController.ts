import { Request, Response } from 'express';
import { HazardService } from '../services/hazardService';
import { getHazardsSchema, createHazardSchema, updateHazardSchema, getHeatmapSchema, getHazardsInBoundsSchema } from '../utils/validation';

const hazardService = new HazardService();

export class HazardController {
  async getHazards(req: Request, res: Response) {
    try {
      const validatedQuery = getHazardsSchema.parse(req.query);
      const { page = 1, limit = 10, ...filters } = validatedQuery;
      
      const result = await hazardService.getHazards(page, limit, filters);
      
      res.json({
        success: true,
        data: result
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Invalid query parameters'
      });
    }
  }

  async getHazardById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const hazard = await hazardService.getHazardById(id);
      
      if (!hazard) {
        return res.status(404).json({
          success: false,
          error: 'Hazard not found'
        });
      }
      
      res.json({
        success: true,
        data: hazard
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
      });
    }
  }

  async createHazard(req: Request, res: Response) {
    try {
      const validatedData = createHazardSchema.parse(req.body);
      const hazard = await hazardService.createHazard(validatedData);
      
      res.status(201).json({
        success: true,
        data: hazard,
        message: 'Hazard created successfully'
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
      });
    }
  }

  async updateHazard(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const validatedData = updateHazardSchema.parse(req.body);
      
      const hazard = await hazardService.updateHazard(id, validatedData);
      
      if (!hazard) {
        return res.status(404).json({
          success: false,
          error: 'Hazard not found'
        });
      }
      
      res.json({
        success: true,
        data: hazard,
        message: 'Hazard updated successfully'
      });
    } catch (error: any) {
      if (error.name === 'ZodError') {
        return res.status(400).json({
          success: false,
          error: 'Validation error',
          details: error.errors
        });
      }
      
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
      });
    }
  }

  async deleteHazard(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await hazardService.deleteHazard(id);
      
      res.json({
        success: true,
        message: 'Hazard deleted successfully'
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        error: error.message || 'Internal server error'
      });
    }
  }

  async getHazardsInBounds(req: Request, res: Response) {
    try {
      const validatedQuery = getHazardsInBoundsSchema.parse(req.query);
      const hazards = await hazardService.getHazardsInBounds(validatedQuery);
      
      res.json({
        success: true,
        data: hazards
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Invalid query parameters'
      });
    }
  }

  async getHeatmapData(req: Request, res: Response) {
    try {
      const validatedQuery = getHeatmapSchema.parse(req.query);
      const { north, south, east, west, gridSize = 0.01 } = validatedQuery;
      
      const heatmapData = await hazardService.generateHeatmapData(
        { north, south, east, west },
        gridSize
      );
      
      res.json({
        success: true,
        data: heatmapData
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Invalid query parameters'
      });
    }
  }

  async getGridData(req: Request, res: Response) {
    try {
      const validatedQuery = getHeatmapSchema.parse(req.query);
      const { north, south, east, west, gridSize = 0.01 } = validatedQuery;
      
      // Update grid cells first
      await hazardService.updateGridCells(
        { north, south, east, west },
        gridSize
      );
      
      // Get grid data
      const gridCells = await hazardService.getGridCells({ north, south, east, west });
      
      res.json({
        success: true,
        data: {
          cells: gridCells,
          bounds: { north, south, east, west },
          gridSize
        }
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        error: error.message || 'Invalid query parameters'
      });
    }
  }
}
