const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET all invoices
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM invoices WHERE company_id = $1 ORDER BY created_at DESC',
      [req.query.company_id || 1]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET invoices by status
router.get('/status/:status', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM invoices WHERE company_id = $1 AND status = $2 ORDER BY created_at DESC',
      [req.query.company_id || 1, req.params.status]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single invoice
router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM invoices WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Invoice not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create invoice
router.post('/', async (req, res) => {
  const { load_id, customer_name, linehaul_rate, fuel_surcharge, detention_charge, driver_payout, total_amount, due_date, company_id } = req.body;
  try {
    const invoiceNumber = `INV-${Date.now()}`;
    const result = await pool.query(
      `INSERT INTO invoices (company_id, invoice_number, load_id, customer_name, linehaul_rate, fuel_surcharge, detention_charge, driver_payout, total_amount, due_date)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [company_id || 1, invoiceNumber, load_id, customer_name, linehaul_rate, fuel_surcharge, detention_charge, driver_payout, total_amount, due_date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update invoice
router.put('/:id', async (req, res) => {
  const { status, paid_date } = req.body;
  try {
    const result = await pool.query(
      'UPDATE invoices SET status=$1, paid_date=$2, updated_at=NOW() WHERE id=$3 RETURNING *',
      [status, paid_date, req.params.id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Invoice not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET revenue summary
router.get('/summary/monthly', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        DATE_TRUNC('month', created_at) as month,
        SUM(total_amount) as revenue,
        SUM(driver_payout) as driver_payouts,
        COUNT(*) as invoice_count
       FROM invoices
       WHERE company_id = $1
       GROUP BY DATE_TRUNC('month', created_at)
       ORDER BY month DESC`,
      [req.query.company_id || 1]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
