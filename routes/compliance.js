const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET compliance logs
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT cl.*, d.name as driver_name FROM compliance_logs cl
       JOIN drivers d ON cl.driver_id = d.id
       WHERE d.company_id = $1 ORDER BY cl.created_at DESC`,
      [req.query.company_id || 1]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET HOS violations
router.get('/hos/violations', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT d.id, d.name, d.truck_id, d.hos_remaining, d.status FROM drivers d
       WHERE d.company_id = $1 AND d.hos_remaining < 3
       ORDER BY d.hos_remaining ASC`,
      [req.query.company_id || 1]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create compliance log
router.post('/', async (req, res) => {
  const { driver_id, violation_type, description, severity } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO compliance_logs (driver_id, violation_type, description, severity)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [driver_id, violation_type, description, severity]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET rate engine
router.get('/rates/all', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM rate_engine WHERE company_id = $1',
      [req.query.company_id || 1]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update rates
router.put('/rates/:id', async (req, res) => {
  const { rate_value } = req.body;
  try {
    const result = await pool.query(
      'UPDATE rate_engine SET rate_value=$1, updated_at=NOW() WHERE id=$2 RETURNING *',
      [rate_value, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
