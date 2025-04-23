require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');
const pool = require('./database/database');

const app = express();

// === 1. CORS SETUP ===
const allowedOrigins = [process.env.VUE_APP_FRONTEND];

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
};

// === 2. Preflight support for frontend -> backend ===
// These MUST come before routes
app.options('/api/auth/*', cors(corsOptions));
app.options('/api/comments/*', cors(corsOptions));
app.options('/api/datasets/*', cors(corsOptions));

// === 3. Global Middleware ===
app.use(cors(corsOptions));
app.use(express.json());

// === 4. Routes ===
app.use('/api', routes);

// === 5. Root Test Route ===
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

// app.get('/api/test', async (req, res) => {
//   try {
//     const [rows] = await pool.execute('SELECT * FROM users');
//     res.json(rows);
//   } catch (err) {
//     console.error('Database error:', err);
//     res.status(500).json({ message: 'Error fetching data' });
//   }
// });

// === 6. 404 & Error Handlers ===
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'An unexpected error occurred' });
});

// === 7. Start Server ===
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
