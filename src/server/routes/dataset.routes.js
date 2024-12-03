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

// Dataset Core Operations
router.get('/', getAllDatasets);
router.get('/:datasetId', getDatasetById);
router.post('/', createDataset);
router.put('/:datasetId', updateDataset);
router.delete('/:datasetId', deleteDataset);

// Dataset Workflow
router.post('/:datasetId/submit', submitDataset);
router.post('/:datasetId/approve', approveDataset);
router.post('/:datasetId/reject', rejectDataset);

// Dataset Comments
router.get('/:datasetId/comments', getDatasetComments);
router.post('/:datasetId/comments', addDatasetComment);

module.exports = router;