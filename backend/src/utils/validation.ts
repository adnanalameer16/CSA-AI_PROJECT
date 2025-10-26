import { z } from 'zod';

export const createHazardSchema = z.object({
  type: z.enum(['EARTHQUAKE', 'FLOOD', 'FIRE', 'LANDSLIDE', 'STORM', 'VOLCANIC', 'TSUNAMI', 'DROUGHT', 'OTHER']),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  description: z.string().min(1).max(1000),
  radius: z.number().min(0).optional(),
  affectedArea: z.number().min(0).optional(),
  status: z.enum(['ACTIVE', 'RESOLVED', 'MONITORING']).optional(),
});

export const updateHazardSchema = createHazardSchema.partial();

export const getHazardsSchema = z.object({
  page: z.string().transform(Number).pipe(z.number().min(1)).optional(),
  limit: z.string().transform(Number).pipe(z.number().min(1).max(100)).optional(),
  type: z.enum(['EARTHQUAKE', 'FLOOD', 'FIRE', 'LANDSLIDE', 'STORM', 'VOLCANIC', 'TSUNAMI', 'DROUGHT', 'OTHER']).optional(),
  severity: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']).optional(),
  status: z.enum(['ACTIVE', 'RESOLVED', 'MONITORING']).optional(),
  search: z.string().optional(),
  north: z.string().transform(Number).pipe(z.number()).optional(),
  south: z.string().transform(Number).pipe(z.number()).optional(),
  east: z.string().transform(Number).pipe(z.number()).optional(),
  west: z.string().transform(Number).pipe(z.number()).optional(),
});

export const getHeatmapSchema = z.object({
  north: z.string().transform(Number).pipe(z.number()),
  south: z.string().transform(Number).pipe(z.number()),
  east: z.string().transform(Number).pipe(z.number()),
  west: z.string().transform(Number).pipe(z.number()),
  gridSize: z.string().transform(Number).pipe(z.number().min(0.001).max(1)).optional(),
});

export const getHazardsInBoundsSchema = z.object({
  north: z.string().transform(Number).pipe(z.number()),
  south: z.string().transform(Number).pipe(z.number()),
  east: z.string().transform(Number).pipe(z.number()),
  west: z.string().transform(Number).pipe(z.number()),
});
