const express = require('express');
const imageRoutes = require('./routes/imageRoutes');

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', imageRoutes);

module.exports = app;