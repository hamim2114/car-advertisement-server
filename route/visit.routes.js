import express from 'express';
import { getVisitsBySlug, recordVisit } from '../controller/visit.controller.js';
const visitRoute = express.Router();

visitRoute.post('/:slug', recordVisit);
visitRoute.get('/:slug', getVisitsBySlug);

export default visitRoute;