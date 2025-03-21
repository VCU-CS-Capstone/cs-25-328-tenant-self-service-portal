const express = require('express');
const cors = require('cors');
require('dotenv').config();

const datasetRoutes = require('./routes/dataset.routes');
const authRoutes = require('./routes/auth.routes');
const pool = require('./database'); // Import database connection

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Using the routes -> Makes a call to respective endpoint 
app.use('/datasets', datasetRoutes);
app.use('/auth', authRoutes);

// Testing if server is running on localhost at endpoint
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Example route to test database connection
app.get('/test', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM Users');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;
