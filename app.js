// Required modules
const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

// Initialize Express application
const app = express();
const upload = multer();

// Define paths
const publicPath = path.join(__dirname, 'public');
const dataPath = path.join(__dirname, 'data');

// Middleware setup
// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        'https://<github space url>',
        'http://localhost:5173'
      ];
      if (!origin || allowedOrigins.some(allowedOrigin => origin.startsWith(allowedOrigin))) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200
  };
app.use(cors(
    corsOptions
)); // Invoke cors as a function and pass the options object

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(express.json()); // Parse JSON bodies

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ message: 'welcome to the root endpoint' });
});

app.use(express.static(publicPath)); // Serve static files from client directory

// Function to start server
const startServer = (port) => {
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    }).on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}...`);
        startServer(port + 1);
      } else {
        console.error(err);
      }
    });
  };
  
  // Start the server
  const PORT = process.env.PORT || 3000;
  startServer(PORT);