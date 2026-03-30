require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

// Connect to MongoDB
connectDB();

const app = express();

// High-performance middleware
app.use(cors()); // Allows your Vite frontend to talk to this API
app.use(express.json()); // Parses incoming JSON payloads

// Basic health check route
app.get('/api/status', (req, res) => {
  res.json({ message: "LifeOS API is running optimally." });
});

// We will mount our routes here next
// app.use('/api/auth', require('./src/routes/authRoutes'));
// app.use('/api/tasks', require('./src/routes/taskRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));