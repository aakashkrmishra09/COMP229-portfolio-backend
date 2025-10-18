// backend/controllers/contactController.js

import Contact from '../models/contactModel.js';
import createError from 'http-errors';

// --- GET ALL CONTACTS ---
export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    next(createError(500, 'Error fetching contacts.'));
  }
};

// --- GET CONTACT BY ID ---
export const getContactById = async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return next(createError(404, 'Contact not found.'));
    }
    res.status(200).json(contact);
  } catch (error) {
    next(createError(500, 'Error fetching contact.'));
  }
};

// --- ADD NEW CONTACT ---
export const addContact = async (req, res, next) => {
  try {
    const newContact = new Contact(req.body);
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    next(createError(400, 'Error adding new contact.'));
  }
};

// --- UPDATE CONTACT BY ID ---
export const updateContactById = async (req, res, next) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedContact) {
      return next(createError(404, 'Contact not found.'));
    }
    res.status(200).json(updatedContact);
  } catch (error) {
    next(createError(400, 'Error updating contact.'));
  }
};

// --- REMOVE CONTACT BY ID ---
export const removeContactById = async (req, res, next) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return next(createError(404, 'Contact not found.'));
    }
    res.status(200).json({ message: 'Contact removed successfully.' });
  } catch (error) {
    next(createError(500, 'Error removing contact.'));
  }
};

// --- REMOVE ALL CONTACTS ---
export const removeAllContacts = async (req, res, next) => {
  try {
    await Contact.deleteMany({});
    res.status(200).json({ message: 'All contacts removed successfully.' });
  } catch (error) {
    next(createError(500, 'Error removing all contacts.'));
  }
};