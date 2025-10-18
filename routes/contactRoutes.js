// backend/routes/contactRoutes.js

import express from 'express';
import {
  getAllContacts,
  getContactById,
  addContact,
  updateContactById,
  removeContactById,
  removeAllContacts
} from '../controllers/contactController.js';

const router = express.Router();

// Route for getting all contacts and adding a new contact
router.route('/')
  .get(getAllContacts) // GET /api/contacts
  .post(addContact)     // POST /api/contacts
  .delete(removeAllContacts); // DELETE /api/contacts

// Route for getting, updating, and deleting a single contact by its ID
router.route('/:id')
  .get(getContactById)      // GET /api/contacts/:id
  .put(updateContactById)   // PUT /api/contacts/:id
  .delete(removeContactById); // DELETE /api/contacts/:id

export default router;