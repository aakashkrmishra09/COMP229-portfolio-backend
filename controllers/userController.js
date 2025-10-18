// backend/controllers/userController.js

import User from '../models/userModel.js';
import createError from 'http-errors';

// --- GET ALL USERS ---
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select('-password'); // Exclude passwords from the result
    res.status(200).json(users);
  } catch (error) {
    next(createError(500, 'Error fetching users.'));
  }
};

// --- GET USER BY ID ---
export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
      return next(createError(404, 'User not found.'));
    }
    res.status(200).json(user);
  } catch (error) {
    next(createError(500, 'Error fetching user.'));
  }
};

// --- ADD NEW USER (REGISTER) ---
export const addUser = async (req, res, next) => {
  try {
    // Note: In a real app, you would hash the password here before saving
    // For this assignment, we save it as plain text as per requirements.
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    next(createError(400, 'Error adding new user.'));
  }
};

// --- UPDATE USER BY ID ---
export const updateUserById = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).select('-password');
    if (!updatedUser) {
      return next(createError(404, 'User not found.'));
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    next(createError(400, 'Error updating user.'));
  }
};

// --- REMOVE USER BY ID ---
export const removeUserById = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return next(createError(404, 'User not found.'));
    }
    res.status(200).json({ message: 'User removed successfully.' });
  } catch (error) {
    next(createError(500, 'Error removing user.'));
  }
};

// --- REMOVE ALL USERS ---
export const removeAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ message: 'All users removed successfully.' });
  } catch (error) {
    next(createError(500, 'Error removing all users.'));
  }
};