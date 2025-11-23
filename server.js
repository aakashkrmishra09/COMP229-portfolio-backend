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

// Connect to MongoDB
connectDB();

const app = express();

// Define the origins (domains) that are allowed to access your API.
// 1. http://localhost:5173: Your local Vite development server.
// 2. http://localhost:3000: Your local backend server (for testing locally).
// 3. YOUR_DEPLOYED_FRONTEND_URL: The live URL of your Vercel/Netlify site.

const allowedOrigins = [
    'http://localhost:5173', 
    'http://localhost:3000', 
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    
    'https://aakash-kumar-mishra-portfolio.vercel.app' 
    // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, or server-to-server)
    if (!origin) return callback(null, true); 
    
    // Check if the requesting origin is in the allowed list
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Explicitly allow all CRUD methods
  credentials: true,
};

// Middleware setup
app.use(cors(corsOptions)); // <-- Now using the strict, secure configuration!
app.use(express.json());
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;

// Root Route
app.get('/', (req, res) => {
  res.json({ message: "Welcome to My Portfolio application." });
});

// --- API ROUTES ---
app.use('/api/contacts', contactRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/users', userRoutes);

// --- ERROR HANDLING MIDDLEWARE ---
app.use((req, res, next) => {
  next(createError(404, 'Not Found'));
});

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