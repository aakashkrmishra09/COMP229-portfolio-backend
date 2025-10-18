// backend/routes/serviceRoutes.js

import express from 'express';
import {
  getAllServices,
  getServiceById,
  addService,
  updateServiceById,
  removeServiceById,
  removeAllServices
} from '../controllers/serviceController.js';

const router = express.Router();

// Route for getting all services and adding a new service
router.route('/')
  .get(getAllServices)    // GET /api/services
  .post(addService)       // POST /api/services
  .delete(removeAllServices); // DELETE /api/services

// Route for getting, updating, and deleting a single service by its ID
router.route('/:id')
  .get(getServiceById)        // GET /api/services/:id
  .put(updateServiceById)     // PUT /api/services/:id
  .delete(removeServiceById); // DELETE /api/services/:id

export default router;