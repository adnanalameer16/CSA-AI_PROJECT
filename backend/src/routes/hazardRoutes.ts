import { Router } from 'express';
import { HazardController } from '../controllers/hazardController';

const router = Router();
const hazardController = new HazardController();

// GET /api/hazards/bounds - Get hazards within bounds
router.get('/bounds', (req, res) => hazardController.getHazardsInBounds(req, res));

// GET /api/hazards/heatmap - Get heatmap data
router.get('/heatmap', (req, res) => hazardController.getHeatmapData(req, res));

// GET /api/hazards/grid - Get grid data
router.get('/grid', (req, res) => hazardController.getGridData(req, res));

// GET /api/hazards - Get all hazards with pagination and filters
router.get('/', (req, res) => hazardController.getHazards(req, res));

// GET /api/hazards/:id - Get hazard by ID
router.get('/:id', (req, res) => hazardController.getHazardById(req, res));

// POST /api/hazards - Create new hazard
router.post('/', (req, res) => hazardController.createHazard(req, res));

// PUT /api/hazards/:id - Update hazard
router.put('/:id', (req, res) => hazardController.updateHazard(req, res));

// DELETE /api/hazards/:id - Delete hazard
router.delete('/:id', (req, res) => hazardController.deleteHazard(req, res));

export default router;
