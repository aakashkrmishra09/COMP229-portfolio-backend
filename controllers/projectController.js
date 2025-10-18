// backend/controllers/projectController.js

import Project from '../models/projectModel.js';
import createError from 'http-errors';

// --- GET ALL PROJECTS ---
export const getAllProjects = async (req, res, next) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    next(createError(500, 'Error fetching projects.'));
  }
};

// --- GET PROJECT BY ID ---
export const getProjectById = async (req, res, next) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return next(createError(404, 'Project not found.'));
    }
    res.status(200).json(project);
  } catch (error) {
    next(createError(500, 'Error fetching project.'));
  }
};

// --- ADD NEW PROJECT ---
export const addProject = async (req, res, next) => {
  try {
    const newProject = new Project(req.body);
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    next(createError(400, 'Error adding new project.'));
  }
};

// --- UPDATE PROJECT BY ID ---
export const updateProjectById = async (req, res, next) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedProject) {
      return next(createError(404, 'Project not found.'));
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    next(createError(400, 'Error updating project.'));
  }
};

// --- REMOVE PROJECT BY ID ---
export const removeProjectById = async (req, res, next) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return next(createError(404, 'Project not found.'));
    }
    res.status(200).json({ message: 'Project removed successfully.' });
  } catch (error) {
    next(createError(500, 'Error removing project.'));
  }
};

// --- REMOVE ALL PROJECTS ---
export const removeAllProjects = async (req, res, next) => {
  try {
    await Project.deleteMany({});
    res.status(200).json({ message: 'All projects removed successfully.' });
  } catch (error) {
    next(createError(500, 'Error removing all projects.'));
  }
};