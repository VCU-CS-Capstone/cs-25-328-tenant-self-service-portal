const express = require('express');
const datasetRoutes = require('./dataset.routes');
const authRoutes = require('./auth.routes');

const router = express.Router();

// Mount all routes
router.use('/datasets', datasetRoutes);
router.use('/auth', authRoutes);

module.exports = router;