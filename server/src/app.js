const express = require('express');
const cors = require('cors');
const routes = require('./routes'); // This imports your routes/index.js file

const app = express();

// 1. Security & Body Parsing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// 2. Our Sanity Check Route
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: "THE API PIPELINE IS WORKING!" });
});

// 3. Mount all other routes
app.use('/api', routes);

// 4. Global Error Handler (catches anything that breaks)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Server Error!' });
});

module.exports = app;