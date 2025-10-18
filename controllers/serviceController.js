// backend/controllers/serviceController.js

import Service from '../models/serviceModel.js';
import createError from 'http-errors';

// --- GET ALL SERVICES ---
export const getAllServices = async (req, res, next) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    next(createError(500, 'Error fetching services.'));
  }
};

// --- GET SERVICE BY ID ---
export const getServiceById = async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return next(createError(404, 'Service not found.'));
    }
    res.status(200).json(service);
  } catch (error) {
    next(createError(500, 'Error fetching service.'));
  }
};

// --- ADD NEW SERVICE ---
export const addService = async (req, res, next) => {
  try {
    const newService = new Service(req.body);
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    next(createError(400, 'Error adding new service.'));
  }
};

// --- UPDATE SERVICE BY ID ---
export const updateServiceById = async (req, res, next) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedService) {
      return next(createError(404, 'Service not found.'));
    }
    res.status(200).json(updatedService);
  } catch (error) {
    next(createError(400, 'Error updating service.'));
  }
};

// --- REMOVE SERVICE BY ID ---
export const removeServiceById = async (req, res, next) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return next(createError(404, 'Service not found.'));
    }
    res.status(200).json({ message: 'Service removed successfully.' });
  } catch (error) {
    next(createError(500, 'Error removing service.'));
  }
};

// --- REMOVE ALL SERVICES ---
export const removeAllServices = async (req, res, next) => {
  try {
    await Service.deleteMany({});
    res.status(200).json({ message: 'All services removed successfully.' });
  } catch (error) {
    next(createError(500, 'Error removing all services.'));
  }
};