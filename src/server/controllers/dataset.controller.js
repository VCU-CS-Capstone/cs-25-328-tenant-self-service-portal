const mockData = require('../utils/mockData');

const getAllDatasets = async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM datasets'); 
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching datasets" });
    }
};

const getDatasetById = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const result = await db.query('SELECT * FROM datasets WHERE id = $1', [datasetId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching dataset" });
    }
};

const createDataset = async (req, res) => {
    try {
        const { name, description } = req.body;
        const result = await db.query(
            'INSERT INTO datasets (name, description, status) VALUES ($1, $2, $3) RETURNING *',
            [name, description, 'DRAFT']
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating dataset" });
    }
};

const updateDataset = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const { name, description } = req.body;
        const result = await db.query(
            'UPDATE datasets SET name = $1, description = $2 WHERE id = $3 RETURNING *',
            [name, description, datasetId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating dataset" });
    }
};

const deleteDataset = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const result = await db.query('DELETE FROM datasets WHERE id = $1 RETURNING *', [datasetId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }
        res.status(204).send(); // No content response for successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting dataset" });
    }
};

const submitDataset = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const result = await db.query(
            'UPDATE datasets SET status = $1, submitted_at = NOW() WHERE id = $2 RETURNING *',
            ['PENDING', datasetId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error submitting dataset" });
    }
};

const approveDataset = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can approve datasets" });
        }

        const { datasetId } = req.params;
        const { comments } = req.body;

        const result = await db.query(
            'UPDATE datasets SET status = $1, approved_at = NOW(), approved_by = $2, comments = $3 WHERE id = $4 RETURNING *',
            ['APPROVED', req.user.username, comments, datasetId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error approving dataset" });
    }
};

const rejectDataset = async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can reject datasets" });
        }

        const { datasetId } = req.params;
        const { comments } = req.body;

        const result = await db.query(
            'UPDATE datasets SET status = $1, rejected_at = NOW(), rejected_by = $2, comments = $3 WHERE id = $4 RETURNING *',
            ['REJECTED', req.user.username, comments, datasetId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }

        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error rejecting dataset" });
    }
};

// ADD BELOW CODE WHEN RBAC IS IMPLEMENTED

// const getDatasetComments = async (req, res) => {
//     try {
//         const dataset = mockData.datasets.find(d => d.datasetId === req.params.datasetId);
//         if (!dataset) {
//             return res.status(404).json({ message: "Dataset not found" });
//         }

//         res.json(dataset.comments || []);
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching comments" });
//     }
// };

// const addDatasetComment = async (req, res) => {
//     try {
//         const dataset = mockData.datasets.find(d => d.datasetId === req.params.datasetId);
//         if (!dataset) {
//             return res.status(404).json({ message: "Dataset not found" });
//         }

//         const newComment = {
//             id: Date.now().toString(),
//             text: req.body.text,
//             createdAt: new Date().toISOString(),
//             createdBy: req.body.userId,
//             isAdminComment: req.user.role === 'admin'
//         };

//         if (!dataset.comments) {
//             dataset.comments = [];
//         }
//         dataset.comments.push(newComment);

//         res.status(201).json(newComment);
//     } catch (error) {
//         res.status(400).json({ message: "Error adding comment" });
//     }
// };

module.exports = {
    getAllDatasets,
    getDatasetById,
    createDataset,
    updateDataset,
    deleteDataset,
    submitDataset,
    approveDataset,
    rejectDataset,
    // getDatasetComments,
    // addDatasetComment
};