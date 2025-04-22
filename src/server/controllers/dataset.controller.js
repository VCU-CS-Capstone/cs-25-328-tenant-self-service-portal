// controllers/dataset.controller.js
const db = require('../database/database');
const { v4: uuidv4 } = require('uuid');

/* ============ LIST & GET ============ */

exports.getAllDatasets = async (req, res) => {
  try {
    const { page = 1, limit = 100, status, lineOfBusiness, search } = req.query;
    const offset = (page - 1) * limit;

    let sql = 'SELECT * FROM datasets';
    const where = [];
    const params = [];

    if (status)          { where.push('status = ?');            params.push(status); }
    if (lineOfBusiness)  { where.push('line_of_business = ?');  params.push(lineOfBusiness); }
    if (search) {
      where.push('(dataset_name LIKE ? OR description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    if (where.length) sql += ' WHERE ' + where.join(' AND ');
    sql += ' LIMIT ? OFFSET ?';
    params.push(+limit, offset);

    const [rows] = await db.query(sql, params);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching datasets' });
  }
};

exports.getDatasetById = async (req, res) => {
  try {
    const { datasetId } = req.params;
    const [rows] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
    if (!rows.length) return res.status(404).json({ message: 'Dataset not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching dataset' });
  }
};

/* ============ CREATE ============ */

exports.createDataset = async (req, res) => {
  try {
    const id = req.body.dataset_id || uuidv4();

    const payload = {
      dataset_id:                     id,
      dataset_version:                req.body.dataset_version     || '1.0',
      dataset_name:                   req.body.dataset_name,
      line_of_business:               req.body.line_of_business,
      description:                    req.body.description,
      has_international_data:         req.body.has_international_data,
      accountable_executive:          req.body.accountable_executive,
      performing_data_steward:        req.body.performing_data_steward,
      managing_data_steward:          req.body.managing_data_steward,
      status:                         'DRAFT',
      managed_field_contracts:        JSON.stringify(req.body.managed_field_contracts        || []),
      client_field_contracts:         JSON.stringify(req.body.client_field_contracts         || []),
      dataset_producers:              JSON.stringify(req.body.dataset_producers              || []),
      dataset_consumers:              JSON.stringify(req.body.dataset_consumers              || []),
      data_sources:                   JSON.stringify(req.body.data_sources                   || []),
      life_cycle_management_policy_ids: JSON.stringify(req.body.life_cycle_management_policy_ids || [])
    };

    await db.query('INSERT INTO datasets SET ?', payload);
    res.status(201).json(payload);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error creating dataset' });
  }
};

/* ============ PARTIAL UPDATE (PATCH) ============ */

exports.updateDataset = async (req, res) => {
  try {
    const { datasetId } = req.params;

    /* 1 . Build a “fields to update” object ONLY for keys that were sent */
    const up = {};
    const b = req.body;                                // shorthand

    if (b.dataset_version      !== undefined) up.dataset_version     = b.dataset_version;
    if (b.dataset_name         !== undefined) up.dataset_name        = b.dataset_name;
    if (b.line_of_business     !== undefined) up.line_of_business    = b.line_of_business;
    if (b.description          !== undefined) up.description         = b.description;
    if (b.has_international_data !== undefined) up.has_international_data = b.has_international_data;
    if (b.accountable_executive !== undefined) up.accountable_executive = b.accountable_executive;
    if (b.performing_data_steward !== undefined) up.performing_data_steward = b.performing_data_steward;
    if (b.managing_data_steward   !== undefined) up.managing_data_steward   = b.managing_data_steward;
    if (b.status               !== undefined) up.status              = b.status;

    // stringify JSON columns if present
    if (b.managed_field_contracts         !== undefined) up.managed_field_contracts =
      JSON.stringify(b.managed_field_contracts);
    if (b.client_field_contracts          !== undefined) up.client_field_contracts  =
      JSON.stringify(b.client_field_contracts);
    if (b.dataset_producers              !== undefined) up.dataset_producers       =
      JSON.stringify(b.dataset_producers);
    if (b.dataset_consumers              !== undefined) up.dataset_consumers       =
      JSON.stringify(b.dataset_consumers);
    if (b.data_sources                   !== undefined) up.data_sources            =
      JSON.stringify(b.data_sources);
    if (b.life_cycle_management_policy_ids !== undefined) up.life_cycle_management_policy_ids =
      JSON.stringify(b.life_cycle_management_policy_ids);

    if (!Object.keys(up).length) {
      return res.status(400).json({ message: 'Nothing to update' });
    }

    /* 2 . Exec patch */
    const [result] = await db.query('UPDATE datasets SET ? WHERE dataset_id = ?', [up, datasetId]);
    if (!result.affectedRows) return res.status(404).json({ message: 'Dataset not found' });

    /* 3 . Return fresh row */
    const [rows] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating dataset' });
  }
};

/* ============ DELETE ============ */

exports.deleteDataset = async (req, res) => {
  try {
    const { datasetId } = req.params;
    const [r] = await db.query('DELETE FROM datasets WHERE dataset_id = ?', [datasetId]);
    if (!r.affectedRows) return res.status(404).json({ message: 'Dataset not found' });
    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting dataset' });
  }
};

/* ============ SUBMIT / APPROVE / REJECT ============ */

exports.submitDataset = async (req, res) => {
  await changeStatus(req, res, 'PENDING_REVIEW');
};

exports.approveDataset = async (req, res) => {
  if (!req.user?.is_admin) {
    return res.status(403).json({ message: 'Only admins can approve datasets' });
  }
  await changeStatus(req, res, 'COMPLETED');
};

exports.rejectDataset = async (req, res) => {
  if (req.user && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Only admins can reject datasets' });
  }
  await changeStatus(req, res, 'DRAFT');
};

/* helper to avoid duplicate code */
async function changeStatus(req, res, newStatus) {
  try {
    const { datasetId } = req.params;
    const [r] = await db.query('UPDATE datasets SET status = ? WHERE dataset_id = ?', [newStatus, datasetId]);
    if (!r.affectedRows) return res.status(404).json({ message: 'Dataset not found' });
    const [rows] = await db.query('SELECT * FROM datasets WHERE dataset_id = ?', [datasetId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Error updating status' });
  }
}

/* ============ OTHER FILTER ENDPOINTS (unchanged) ============ */

exports.getDatasetsByProducer = async (req, res) => {
  try {
    const { producerId } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM datasets WHERE JSON_CONTAINS(dataset_producers, ?)',
      [JSON.stringify(producerId)]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching datasets by producer' });
  }
};

exports.getDatasetsByConsumer = async (req, res) => {
  try {
    const { consumerId } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM datasets WHERE JSON_CONTAINS(dataset_consumers, ?)',
      [JSON.stringify(consumerId)]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching datasets by consumer' });
  }
};

exports.getDatasetsByDataSource = async (req, res) => {
  try {
    const { dataSourceId } = req.params;
    const [rows] = await db.query(
      'SELECT * FROM datasets WHERE JSON_CONTAINS(data_sources, ?)',
      [JSON.stringify(dataSourceId)]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching datasets by data source' });
  }
};

exports.getDatasetStats = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        COUNT(*)                                     AS total_datasets,
        COUNT(CASE WHEN status='DRAFT'          THEN 1 END) AS draft_count,
        COUNT(CASE WHEN status='COMPLETED'      THEN 1 END) AS completed_count,
        COUNT(CASE WHEN status='PENDING_REVIEW' THEN 1 END) AS pending_review_count,
        COUNT(DISTINCT line_of_business)             AS unique_business_lines
      FROM datasets
    `);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching dataset statistics' });
  }
};
