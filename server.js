// backend/server.js

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import createError from 'http-errors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import all the route files
import contactRoutes from './routes/contactRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import userRoutes from './routes/userRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB [cite: 45]
connectDB();

const app = express();

// Middleware setup [cite: 46]
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

// Root Route [cite: 34, 35]
app.get('/', (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// --- API ROUTES ---
// Tell the app to use your route files for any URL starting with these paths
app.use('/api/contacts', contactRoutes); // [cite: 53]
app.use('/api/projects', projectRoutes); // [cite: 55]
app.use('/api/services', serviceRoutes); // [cite: 57]
app.use('/api/users', userRoutes);       // [cite: 59]

// --- ERROR HANDLING MIDDLEWARE ---
// This catches any requests to a URL that doesn't exist
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

// This is the main error handler that sends back a JSON error response [cite: 47]
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});