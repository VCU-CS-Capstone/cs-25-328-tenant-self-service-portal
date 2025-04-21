const express = require('express');
const cors = require('cors');
require('dotenv').config();

const routes = require('./routes');
const pool = require('./database/database');

const app = express();

// Middleware
app.use(cors({
  origin: '*',  // allow all for now — adjust later for security
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Use the aggregated routes
app.use('/api', routes);

// Root route
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Test database connection route
app.get('/api/test', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
