import express from 'express';
import { createLink, getAllLinks, getLinkBySlug } from '../controller/link.controller.js';
const linkRoute = express.Router();

linkRoute.post('/', createLink);
linkRoute.get('/', getAllLinks);
linkRoute.get('/:slug', getLinkBySlug);

export default linkRoute;
