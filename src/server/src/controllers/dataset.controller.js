// dataset.controller.js
const mockData = require('../utils/mockData');

const getAllDatasets = async (req, res) => {
   try {
       res.json(mockData.datasets);
   } catch (error) {
       res.status(500).json({ message: "Error fetching datasets" });
   }
};

const getDatasetById = async (req, res) => {
   try {
       const dataset = mockData.datasets.find(d => d.datasetId === req.params.datasetId);
       if (!dataset) {
           return res.status(404).json({ message: "Dataset not found" });
       }
       res.json(dataset);
   } catch (error) {
       res.status(500).json({ message: "Error fetching dataset" });
   }
};

const createDataset = async (req, res) => {
   try {
       const newDataset = {
           ...req.body,
           datasetId: Date.now().toString(), // Simple ID generation
           status: 'DRAFT'
       };
       mockData.datasets.push(newDataset);
       res.status(201).json(newDataset);
   } catch (error) {
       res.status(400).json({ message: "Error creating dataset" });
   }
};

const updateDataset = async (req, res) => {
   try {
       const index = mockData.datasets.findIndex(d => d.datasetId === req.params.datasetId);
       if (index === -1) {
           return res.status(404).json({ message: "Dataset not found" });
       }

       mockData.datasets[index] = {
           ...mockData.datasets[index],
           ...req.body,
           datasetId: req.params.datasetId // Ensure ID doesn't change
       };

       res.json(mockData.datasets[index]);
   } catch (error) {
       res.status(400).json({ message: "Error updating dataset" });
   }
};

const deleteDataset = async (req, res) => {
   try {
       const index = mockData.datasets.findIndex(d => d.datasetId === req.params.datasetId);
       if (index === -1) {
           return res.status(404).json({ message: "Dataset not found" });
       }

       mockData.datasets.splice(index, 1);
       res.status(204).send();
   } catch (error) {
       res.status(500).json({ message: "Error deleting dataset" });
   }
};

const submitDataset = async (req, res) => {
   try {
       const dataset = mockData.datasets.find(d => d.datasetId === req.params.datasetId);
       if (!dataset) {
           return res.status(404).json({ message: "Dataset not found" });
       }

       dataset.status = 'PENDING';
       dataset.submittedAt = new Date().toISOString();
       
       res.json(dataset);
   } catch (error) {
       res.status(400).json({ message: "Error submitting dataset" });
   }
};

const approveDataset = async (req, res) => {
   try {
       const dataset = mockData.datasets.find(d => d.datasetId === req.params.datasetId);
       if (!dataset) {
           return res.status(404).json({ message: "Dataset not found" });
       }

       dataset.status = 'APPROVED';
       dataset.approvedAt = new Date().toISOString();
       dataset.comments = req.body.comments;
       
       res.json(dataset);
   } catch (error) {
       res.status(400).json({ message: "Error approving dataset" });
   }
};

const rejectDataset = async (req, res) => {
   try {
       const dataset = mockData.datasets.find(d => d.datasetId === req.params.datasetId);
       if (!dataset) {
           return res.status(404).json({ message: "Dataset not found" });
       }

       dataset.status = 'REJECTED';
       dataset.rejectedAt = new Date().toISOString();
       dataset.comments = req.body.comments;
       
       res.json(dataset);
   } catch (error) {
       res.status(400).json({ message: "Error rejecting dataset" });
   }
};

const getDatasetComments = async (req, res) => {
   try {
       const dataset = mockData.datasets.find(d => d.datasetId === req.params.datasetId);
       if (!dataset) {
           return res.status(404).json({ message: "Dataset not found" });
       }

       res.json(dataset.comments || []);
   } catch (error) {
       res.status(500).json({ message: "Error fetching comments" });
   }
};

const addDatasetComment = async (req, res) => {
   try {
       const dataset = mockData.datasets.find(d => d.datasetId === req.params.datasetId);
       if (!dataset) {
           return res.status(404).json({ message: "Dataset not found" });
       }

       const newComment = {
           id: Date.now().toString(),
           text: req.body.text,
           createdAt: new Date().toISOString(),
           createdBy: req.body.userId // Assuming user info is in request
       };

       if (!dataset.comments) {
           dataset.comments = [];
       }
       dataset.comments.push(newComment);
       
       res.status(201).json(newComment);
   } catch (error) {
       res.status(400).json({ message: "Error adding comment" });
   }
};

module.exports = {
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
};