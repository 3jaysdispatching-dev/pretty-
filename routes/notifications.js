const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all notifications
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM notifications WHERE company_id = $1 ORDER BY created_at DESC LIMIT 50',
      [req.query.company_id || 1]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET unread count
router.get('/unread/count', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT COUNT(*) FROM notifications WHERE company_id = $1 AND read = FALSE',
      [req.query.company_id || 1]
    );
    res.json({ unread: parseInt(result.rows[0].count) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create notification
router.post('/', async (req, res) => {
  const { driver_id, type, title, message, company_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO notifications (company_id, driver_id, type, title, message)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [company_id || 1, driver_id, type, title, message]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PATCH mark as read
router.patch('/:id/read', async (req, res) => {
  try {
    const result = await pool.query(
      'UPDATE notifications SET read=TRUE WHERE id=$1 RETURNING *',
      [req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
