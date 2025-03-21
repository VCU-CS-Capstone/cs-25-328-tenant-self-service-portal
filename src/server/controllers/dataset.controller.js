const db = require('../database/database'); 

const getAllDatasets = async (req, res) => {
    try {
      const { page = 1, limit = 10, status, lineOfBusiness, search } = req.query;
      const offset = (page - 1) * limit;
      
      let query = 'SELECT * FROM datasets';
      let whereConditions = [];
      let params = [];
      let paramCount = 1;
      
      if (status) {
        whereConditions.push(`status = $${paramCount++}`);
        params.push(status);
      } 
      
      if (lineOfBusiness) {
        whereConditions.push(`line_of_business = $${paramCount++}`);
        params.push(lineOfBusiness);
      } 
      
      if (search) {
        whereConditions.push(`(dataset_name ILIKE $${paramCount} OR description ILIKE $${paramCount})`);
        params.push(`%${search}%`);
        paramCount++;
      } 
      
      if (whereConditions.length > 0) {
        query += ` WHERE ${whereConditions.join(' AND ')}`;
      } 
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching datasets" });
    }
  }; 
  
  
  const getDatasetById = async (req, res) => {
    try {
      const { datasetId } = req.params;
      const result = await db.query('SELECT * FROM datasets WHERE dataset_id = $1', [datasetId]);
      
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
        const {
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
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING *
        `;

        const values = [
            dataset_id,
            dataset_version,
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

        const result = await db.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error creating dataset" });
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
        const checkResult = await db.query('SELECT * FROM datasets WHERE dataset_id = $1', [datasetId]);
        if (checkResult.rows.length === 0) {
            return res.status(404).json({ message: "Dataset not found" });
        }

        const query = `
            UPDATE datasets SET
                dataset_version = $1,
                dataset_name = $2,
                line_of_business = $3,
                description = $4,
                has_international_data = $5,
                accountable_executive = $6,
                performing_data_steward = $7,
                managing_data_steward = $8,
                managed_field_contracts = $9,
                client_field_contracts = $10,
                dataset_producers = $11,
                dataset_consumers = $12,
                data_sources = $13,
                life_cycle_management_policy_ids = $14
            WHERE dataset_id = $15
            RETURNING *
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

        const result = await db.query(query, values);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: "Error updating dataset" });
    }
};

const deleteDataset = async (req, res) => {
    try {
        const { datasetId } = req.params;
        const result = await db.query('DELETE FROM datasets WHERE dataset_id = $1 RETURNING *', [datasetId]);
        
        if (result.rows.length === 0) {
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
        const result = await db.query(
            'UPDATE datasets SET status = $1 WHERE dataset_id = $2 RETURNING *',
            ['PENDING_REVIEW', datasetId]
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
        if (req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can approve datasets" });
        }

        const { datasetId } = req.params;
        const result = await db.query(
            'UPDATE datasets SET status = $1 WHERE dataset_id = $2 RETURNING *',
            ['COMPLETED', datasetId]
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
        if (req.user && req.user.role !== 'admin') {
            return res.status(403).json({ message: "Only admins can reject datasets" });
        }

        const { datasetId } = req.params;
        const result = await db.query(
            'UPDATE datasets SET status = $1 WHERE dataset_id = $2 RETURNING *',
            ['DRAFT', datasetId]
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

const getDatasetsByProducer = async (req, res) => {
    try {
        const { producerId } = req.params;

        const query = `
            SELECT * FROM datasets 
            WHERE dataset_producers @> $1::jsonb
            ORDER BY dataset_name
        `;
        
        const result = await db.query(query, [JSON.stringify([producerId])]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching datasets by producer" });
    }
};

const getDatasetsByConsumer = async (req, res) => {
    try {
        const { consumerId } = req.params;

        const query = `
            SELECT * FROM datasets 
            WHERE dataset_consumers @> $1::jsonb
            ORDER BY dataset_name
        `;
        
        const result = await db.query(query, [JSON.stringify([consumerId])]);
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching datasets by consumer" });
    }
};

const getDatasetsByDataSource = async (req, res) => {
    try {
        const { dataSourceId } = req.params;

        const query = `
            SELECT * FROM datasets 
            WHERE data_sources @> $1::jsonb
            ORDER BY dataset_name
        `;
        
        const result = await db.query(query, [JSON.stringify([dataSourceId])]);
        res.json(result.rows);
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
        
        const result = await db.query(statsQuery);
        res.json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching dataset statistics" });
    }
};

// Commented out until RBAC is implemented
// const getDatasetComments = async (req, res) => {
//     try {
//         const { datasetId } = req.params;
//         const result = await db.query('SELECT * FROM dataset_comments WHERE dataset_id = $1 ORDER BY created_at DESC', [datasetId]);
//         res.json(result.rows);
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
        
//         const result = await db.query(
//             'INSERT INTO dataset_comments (dataset_id, text, created_by, is_admin_comment) VALUES ($1, $2, $3, $4) RETURNING *',
//             [datasetId, text, userId, isAdmin]
//         );
        
//         res.status(201).json(result.rows[0]);
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
