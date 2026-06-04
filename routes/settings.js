const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET settings
router.get('/', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM settings WHERE company_id = $1',
      [req.query.company_id || 1]
    );
    if (result.rows.length === 0) {
      // Create default settings
      const newSettings = await pool.query(
        'INSERT INTO settings (company_id) VALUES ($1) RETURNING *',
        [req.query.company_id || 1]
      );
      return res.json(newSettings.rows[0]);
    }
    // Don't return sensitive tokens to client
    const settings = result.rows[0];
    delete settings.twilio_token;
    delete settings.samsara_api_key;
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update settings
router.put('/', async (req, res) => {
  const { mapbox_token, twilio_sid, twilio_token, twilio_from, samsara_api_key, company_id } = req.body;
  try {
    const existingResult = await pool.query(
      'SELECT id FROM settings WHERE company_id = $1',
      [company_id || 1]
    );

    let result;
    if (existingResult.rows.length === 0) {
      result = await pool.query(
        `INSERT INTO settings (company_id, mapbox_token, twilio_sid, twilio_token, twilio_from, samsara_api_key)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [company_id || 1, mapbox_token, twilio_sid, twilio_token, twilio_from, samsara_api_key]
      );
    } else {
      result = await pool.query(
        `UPDATE settings 
         SET mapbox_token=$1, twilio_sid=$2, twilio_token=$3, twilio_from=$4, samsara_api_key=$5, updated_at=NOW()
         WHERE company_id=$6 RETURNING *`,
        [mapbox_token, twilio_sid, twilio_token, twilio_from, samsara_api_key, company_id || 1]
      );
    }

    // Don't return sensitive tokens
    const settings = result.rows[0];
    delete settings.twilio_token;
    delete settings.samsara_api_key;
    res.json(settings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET company info
router.get('/company/info', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM companies WHERE id = $1',
      [req.query.company_id || 1]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Company not found' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update company
router.put('/company/info', async (req, res) => {
  const { name, mc_number, dot_number, dispatcher_email, company_id } = req.body;
  try {
    const result = await pool.query(
      `UPDATE companies 
       SET name=$1, mc_number=$2, dot_number=$3, dispatcher_email=$4, updated_at=NOW()
       WHERE id=$5 RETURNING *`,
      [name, mc_number, dot_number, dispatcher_email, company_id || 1]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
