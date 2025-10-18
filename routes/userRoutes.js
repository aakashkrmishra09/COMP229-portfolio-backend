// backend/routes/userRoutes.js

import express from 'express';
import {
  getAllUsers,
  getUserById,
  addUser,
  updateUserById,
  removeUserById,
  removeAllUsers
} from '../controllers/userController.js';

const router = express.Router();

// Route for getting all users and adding a new user
router.route('/')
  .get(getAllUsers)    // GET /api/users
  .post(addUser)       // POST /api/users
  .delete(removeAllUsers); // DELETE /api/users

// Route for getting, updating, and deleting a single user by its ID
router.route('/:id')
  .get(getUserById)        // GET /api/users/:id
  .put(updateUserById)     // PUT /api/users/:id
  .delete(removeUserById); // DELETE /api/users/:id

export default router;