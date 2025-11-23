// backend/routes/projectRoutes.js

import express from 'express';
import {
  getAllProjects,
  getProjectById,
  addProject,
  updateProjectById,
  removeProjectById,
  removeAllProjects
} from '../controllers/projectController.js';

const router = express.Router();

// Route for getting all projects and adding a new project
router.route('/')
  .get(getAllProjects)    // GET /api/projects
  .post(addProject)       // POST /api/projects
  .delete(removeAllProjects); // DELETE /api/projects

// Route for getting, updating, and deleting a single project by its ID
router.route('/:id')
  .get(getProjectById)        // GET /api/projects/:id
  .put(updateProjectById)     // PUT /api/projects/:id
  .delete(removeProjectById); // DELETE /api/projects/:id

export default router;