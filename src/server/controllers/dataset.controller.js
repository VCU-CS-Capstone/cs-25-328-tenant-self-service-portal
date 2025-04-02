const db = require('../database/database'); 
const { v4: uuidv4 } = require('uuid');

const getAllDatasets = async (req, res) => {
    try {
      const { page = 1, limit = 10, status, lineOfBusiness, search } = req.query;
      const offset = (page - 1) * limit;
      
      let query = 'SELECT * FROM datasets';
      let whereConditions = [];
      let params = [];
      
      if (status) {
        whereConditions.push(`status = ?`);
        params.push(status);
      } 
      
      if (lineOfBusiness) {
        whereConditions.push(`line_of_business = ?`);
        params.push(lineOfBusiness);
      } 
      
      if (search) {
        whereConditions.push(`(dataset_name LIKE ? OR description LIKE ?)`);
        params.push(`%${search}%`);
        params.push(`%${search}%`);
      } 
      
      if (whereConditions.length > 0) {
        query += ` WHERE ${whereConditions.join(' AND ')}`;
      }
      
      // Add pagination
      query += ` LIMIT ? OFFSET ?`;
      params.push(parseInt(limit));
      params.push(offset);
      
      const [results] = await db.query(query, params);
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching datasets" });
    }
  }; 
  
  
  const getDatasetById = async (req, res) => {
    try {
      const { datasetId } = req.params;
      const [results] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
      
      if (results.length === 0) {
        return res.status(404).json({ message: "Dataset not found" });
      }
      
      res.json(results[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching dataset" });
    }
  };

const createDataset = async (req, res) => {
    try {
        // Extract data from request body
        let {
            dataset_id,
            dataset_version,
            dataset_name,
            line_of_business,
            description,
            has_international_data,
            accountable_executive,
            performing_data_steward,
            managing_data_steward,
            managed_field_contracts,
            client_field_contracts,
            dataset_producers,
            dataset_consumers,
            data_sources,
            life_cycle_management_policy_ids
        } = req.body;

        // Generate a UUID if dataset_id is not provided
        if (!dataset_id) {
            dataset_id = uuidv4();
        }

        const query = `
            INSERT INTO datasets (
                dataset_id,
                dataset_version,
                dataset_name,
                line_of_business,
                description,
                has_international_data,
                accountable_executive,
                performing_data_steward,
                managing_data_steward,
                status,
                managed_field_contracts,
                client_field_contracts,
                dataset_producers,
                dataset_consumers,
                data_sources,
                life_cycle_management_policy_ids
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            dataset_id,
            dataset_version || '1.0',
            dataset_name,
            line_of_business,
            description,
            has_international_data,
            accountable_executive,
            performing_data_steward,
            managing_data_steward,
            'DRAFT', // Default status
            JSON.stringify(managed_field_contracts || []),
            JSON.stringify(client_field_contracts || []),
            JSON.stringify(dataset_producers || []),
            JSON.stringify(dataset_consumers || []),
            JSON.stringify(data_sources || []),
            JSON.stringify(life_cycle_management_policy_ids || [])
        ];

        // Execute query
        const [result] = await db.query(query, values);
        
        // Return the created dataset
        res.status(201).json({
            dataset_id: dataset_id,
            ...req.body,
            status: 'DRAFT'
        });
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating dataset: " + error.message });
    }
};

const updateDataset = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const {
            dataset_version,
            dataset_name,
            line_of_business,
            description,
            has_international_data,
            accountable_executive,
            performing_data_steward,
            managing_data_steward,
            managed_field_contracts,
            client_field_contracts,
            dataset_producers,
            dataset_consumers,
            data_sources,
            life_cycle_management_policy_ids
        } = req.body;

        // Check if dataset exists
        const [checkResults] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
        if (checkResults.length === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }

        const query = `
            UPDATE datasets SET
                dataset_version = ?,
                dataset_name = ?,
                line_of_business = ?,
                description = ?,
                has_international_data = ?,
                accountable_executive = ?,
                performing_data_steward = ?,
                managing_data_steward = ?,
                managed_field_contracts = ?,
                client_field_contracts = ?,
                dataset_producers = ?,
                dataset_consumers = ?,
                data_sources = ?,
                life_cycle_management_policy_ids = ?
            WHERE dataset_id = ?
        `;

        const values = [
            dataset_version,
            dataset_name,
            line_of_business,
            description,
            has_international_data,
            accountable_executive,
            performing_data_steward,
            managing_data_steward,
            JSON.stringify(managed_field_contracts || []),
            JSON.stringify(client_field_contracts || []),
            JSON.stringify(dataset_producers || []),
            JSON.stringify(dataset_consumers || []),
            JSON.stringify(data_sources || []),
            JSON.stringify(life_cycle_management_policy_ids || []),
            datasetId
        ];

        await db.query(query, values);
        
        // Fetch the updated dataset
        const [updatedResults] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
        res.json(updatedResults[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating dataset" });
    }
};

const deleteDataset = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const [result] = await db.query('DELETE FROM datasets WHERE dataset_id = ?', [datasetId]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }
        
        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting dataset" });
    }
};

const submitDataset = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const [result] = await db.query(
            'UPDATE datasets SET status = ? WHERE dataset_id = ?',
            ['PENDING_REVIEW', datasetId]
        );
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }
        
        // Fetch the updated dataset
        const [updatedResults] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
        res.json(updatedResults[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error submitting dataset: " + error.message });
    }
};

const approveDataset = async (req, res) => {
    try {
        if (req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can approve datasets" });
        }

        const { datasetId } = req.params;
        const [result] = await db.query(
            'UPDATE datasets SET status = ? WHERE dataset_id = ?',
            ['COMPLETED', datasetId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }

        // Fetch the updated dataset
        const [updatedResults] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
        res.json(updatedResults[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error approving dataset" });
    }
};

const rejectDataset = async (req, res) => {
    try {
        if (req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can reject datasets" });
        }

        const { datasetId } = req.params;
        const [result] = await db.query(
            'UPDATE datasets SET status = ? WHERE dataset_id = ?',
            ['DRAFT', datasetId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }

        // Fetch the updated dataset
        const [updatedResults] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
        res.json(updatedResults[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error rejecting dataset" });
    }
};

const getDatasetsByProducer = async (req, res) => {
    try {
        const { producerId } = req.params;

        // MySQL JSON search (different from PostgreSQL)
        // This is a simplification - may need adjustment based on your MySQL version
        const query = `
            SELECT * FROM datasets 
            WHERE JSON_CONTAINS(dataset_producers, ?)
            ORDER BY dataset_name
        `;
        
        const [results] = await db.query(query, [JSON.stringify(producerId)]);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching datasets by producer" });
    }
};

const getDatasetsByConsumer = async (req, res) => {
    try {
        const { consumerId } = req.params;

        // MySQL JSON search (different from PostgreSQL)
        const query = `
            SELECT * FROM datasets 
            WHERE JSON_CONTAINS(dataset_consumers, ?)
            ORDER BY dataset_name
        `;
        
        const [results] = await db.query(query, [JSON.stringify(consumerId)]);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching datasets by consumer" });
    }
};

const getDatasetsByDataSource = async (req, res) => {
    try {
        const { dataSourceId } = req.params;

        // MySQL JSON search (different from PostgreSQL)
        const query = `
            SELECT * FROM datasets 
            WHERE JSON_CONTAINS(data_sources, ?)
            ORDER BY dataset_name
        `;
        
        const [results] = await db.query(query, [JSON.stringify(dataSourceId)]);
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching datasets by data source" });
    }
};

const getDatasetStats = async (req, res) => {
    try {
        const statsQuery = `
            SELECT 
                COUNT(*) as total_datasets,
                COUNT(CASE WHEN status = 'DRAFT' THEN 1 END) as draft_count,
                COUNT(CASE WHEN status = 'COMPLETED' THEN 1 END) as completed_count,
                COUNT(CASE WHEN status = 'PENDING_REVIEW' THEN 1 END) as pending_review_count,
                COUNT(DISTINCT line_of_business) as unique_business_lines
            FROM datasets
        `;
        
        const [results] = await db.query(statsQuery);
        res.json(results[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching dataset statistics" });
    }
};

// Commented out until RBAC is implemented
// const getDatasetComments = async (req, res) => {
//     try {
//         const { datasetId } = req.params;
//         const [results] = await db.query('SELECT * FROM dataset_comments WHERE dataset_id = ? ORDER BY created_at DESC', [datasetId]);
//         res.json(results);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: "Error fetching comments" });
//     }
// };

// const addDatasetComment = async (req, res) => {
//     try {
//         const { datasetId } = req.params;
//         const { text } = req.body;
//         const userId = req.user.id;
//         const isAdmin = req.user.role === 'admin';
        
//         const [result] = await db.query(
//             'INSERT INTO dataset_comments (dataset_id, text, created_by, is_admin_comment) VALUES (?, ?, ?, ?)',
//             [datasetId, text, userId, isAdmin]
//         );
        
//         // Get the inserted comment
//         const [newComment] = await db.query('SELECT * FROM dataset_comments WHERE id = ?', [result.insertId]);
//         res.status(201).json(newComment[0]);
//     } catch (error) {
//         console.error(error);
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
    getDatasetsByProducer,
    getDatasetsByConsumer,
    getDatasetsByDataSource,
    getDatasetStats,
    // getDatasetComments,
    // addDatasetComment
};