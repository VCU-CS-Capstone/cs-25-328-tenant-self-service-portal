const express = require('express');
const router = express.Router();
const datasetController = require('../controllers/dataset.controller');
const { authenticateUser, authorizeAdmin } = require('../middleware/auth');

// Get all datasets (with optional filtering)
router.get('/', authenticateUser, datasetController.getAllDatasets);

// Get dataset statistics - specific route should come before parameter routes
router.get('/stats', authenticateUser, authorizeAdmin, datasetController.getDatasetStats);

// Get datasets by producer - specific route should come before parameter routes
router.get('/producer/:producerId', authenticateUser, datasetController.getDatasetsByProducer);

// Get datasets by consumer - specific route should come before parameter routes
router.get('/consumer/:consumerId', authenticateUser, datasetController.getDatasetsByConsumer);

// Get datasets by data source - specific route should come before parameter routes
router.get('/datasource/:dataSourceId', authenticateUser, datasetController.getDatasetsByDataSource);

// Get a specific dataset by ID - generic parameter route should come after specific routes
router.get('/:datasetId', authenticateUser, datasetController.getDatasetById);

// Create a new dataset
router.post('/', authenticateUser, datasetController.createDataset);

// Update an existing dataset
router.put('/:datasetId', authenticateUser, datasetController.updateDataset);

// Delete a dataset
router.delete('/:datasetId', authenticateUser, authorizeAdmin, datasetController.deleteDataset);

// Submit a dataset for review
router.post('/:datasetId/submit', authenticateUser, datasetController.submitDataset);

// Approve a dataset
router.post('/:datasetId/approve', authenticateUser, authorizeAdmin, datasetController.approveDataset);

// Reject a dataset
router.post('/:datasetId/reject', authenticateUser, authorizeAdmin, datasetController.rejectDataset);

// Commented out until RBAC is implemented
// // Get comments for a dataset
// router.get('/:datasetId/comments', authenticateUser, datasetController.getDatasetComments);

// // Add a comment to a dataset
// router.post('/:datasetId/comments', authenticateUser, datasetController.addDatasetComment);

module.exports = router;
