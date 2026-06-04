const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all loads
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, d.name as driver_name FROM loads l
       LEFT JOIN drivers d ON l.driver_id = d.id
       WHERE l.company_id = $1 ORDER BY l.created_at DESC`,
      [req.query.company_id || 1]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET loads by status
router.get('/status/:status', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, d.name as driver_name FROM loads l
       LEFT JOIN drivers d ON l.driver_id = d.id
       WHERE l.company_id = $1 AND l.status = $2 ORDER BY l.created_at DESC`,
      [req.query.company_id || 1, req.params.status]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single load
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT l.*, d.name as driver_name FROM loads l
       LEFT JOIN drivers d ON l.driver_id = d.id
       WHERE l.id = $1`,
      [req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Load not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create load
router.post('/', async (req, res) => {
  const { origin, destination, commodity, weight_lbs, rate, priority, shipper_name, customer_name, pickup_date, company_id } = req.body;
  try {
    // Generate load number
    const countResult = await pool.query('SELECT COUNT(*) FROM loads WHERE company_id = $1', [company_id || 1]);
    const loadNumber = `L-${Date.now()}`;

    const result = await pool.query(
      `INSERT INTO loads (company_id, load_number, origin, destination, commodity, weight_lbs, rate, priority, shipper_name, customer_name, pickup_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [company_id || 1, loadNumber, origin, destination, commodity, weight_lbs, rate, priority, shipper_name, customer_name, pickup_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update load
router.put('/:id', async (req, res) => {
  const { origin, destination, commodity, weight_lbs, driver_id, status, rate, priority, pickup_date, delivery_date } = req.body;
  try {
    const result = await pool.query(
      `UPDATE loads 
       SET origin=$1, destination=$2, commodity=$3, weight_lbs=$4, driver_id=$5, status=$6, rate=$7, priority=$8, pickup_date=$9, delivery_date=$10, updated_at=NOW()
       WHERE id=$11 RETURNING *`,
      [origin, destination, commodity, weight_lbs, driver_id, status, rate, priority, pickup_date, delivery_date, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Load not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE load
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM loads WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Load not found' });
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
