const express = require('express');
const cors = require('cors');
require('dotenv').config();

const datasetRoute = require('./routes/dataset.routes')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Using the routes -> Makes a call to respective endpoint 
app.use('/datasets', datasetRoute);

// Testing if server is running on localhost at endpoint
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = server;