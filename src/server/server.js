const express = require('express');
const cors = require('cors');
require('dotenv').config();

const datasetRoutes = require('./routes/dataset.routes')

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Testing if server is running on localhost at endpoint
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// Checking if server is running on the correct port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/dataset', (req, res) => {
    res.json({ message: 'Dataset registered successfully' });
});

app.post('/usecase', (req, res) => {
    res.json({ message: 'Use case registered successfully' });
});

app.use('/api/datasets', datasetRoutes);
