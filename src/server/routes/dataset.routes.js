// dataset.routes.js
const express = require('express');
const router = express.Router();
const { 
    getAllDatasets,
    getDatasetById,
    createDataset,
    updateDataset,
    deleteDataset,
    submitDataset,
    approveDataset,
    rejectDataset,
    getDatasetComments,
    addDatasetComment
} = require('../controllers/dataset.controller');
const { verifyToken, checkRole } = require('../middleware/auth');

// Public routes
router.get('/', getAllDatasets);
router.get('/:datasetId', getDatasetById);

// Authenticated user routes
router.use(verifyToken);
router.post('/', createDataset);
router.put('/:datasetId', updateDataset);
router.delete('/:datasetId', deleteDataset);
router.post('/:datasetId/submit', submitDataset);

// Dataset Comments (authenticated users)
router.get('/:datasetId/comments', getDatasetComments);
router.post('/:datasetId/comments', addDatasetComment);

// Admin-only routes
router.post('/:datasetId/approve', checkRole(['admin']), approveDataset);
router.post('/:datasetId/reject', checkRole(['admin']), rejectDataset);

module.exports = router;
