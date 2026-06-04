const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all drivers
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM drivers WHERE company_id = $1 ORDER BY created_at DESC',
      [req.query.company_id || 1]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single driver
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM drivers WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Driver not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create driver
router.post('/', async (req, res) => {
  const { name, phone, email, truck_id, home_base, cdl_class, license_exp, company_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO drivers (company_id, name, phone, email, truck_id, home_base, cdl_class, license_exp)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [company_id || 1, name, phone, email, truck_id, home_base, cdl_class, license_exp]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update driver
router.put('/:id', async (req, res) => {
  const { name, phone, email, truck_id, home_base, cdl_class, license_exp, status, hos_remaining } = req.body;
  try {
    const result = await pool.query(
      `UPDATE drivers 
       SET name=$1, phone=$2, email=$3, truck_id=$4, home_base=$5, cdl_class=$6, license_exp=$7, status=$8, hos_remaining=$9, updated_at=NOW()
       WHERE id=$10 RETURNING *`,
      [name, phone, email, truck_id, home_base, cdl_class, license_exp, status, hos_remaining, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Driver not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE driver
router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM drivers WHERE id = $1 RETURNING id', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Driver not found' });
    res.json({ deleted: true, id: req.params.id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update driver location
router.patch('/:id/location', async (req, res) => {
  const { latitude, longitude } = req.body;
  try {
    const result = await pool.query(
      'UPDATE drivers SET latitude=$1, longitude=$2, updated_at=NOW() WHERE id=$3 RETURNING *',
      [latitude, longitude, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
