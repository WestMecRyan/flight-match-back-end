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
    origin: process.env.FRONTEND_URL || 'http://localhost:5173', // vite's default port
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

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});