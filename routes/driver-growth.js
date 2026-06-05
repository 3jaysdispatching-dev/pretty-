/**
 * THREE Driver Growth System - API Routes
 * Recruiting, Onboarding, Retention endpoints
 */

const express = require('express');
const db = require('../db');
const router = express.Router();

// ===== RECRUITING ROUTES =====

// Get all driver candidates
router.get('/candidates', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM driver_candidates ORDER BY created_at DESC'
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create driver candidate
router.post('/candidates', async (req, res) => {
    try {
        const { name, email, phone, company, equipment, mc_number, source_id } = req.body;
        const result = await db.query(
            `INSERT INTO driver_candidates (name, email, phone, company, equipment, mc_number, source_id, status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, 'prospect')
             RETURNING *`,
            [name, email, phone, company, equipment, mc_number, source_id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get candidate details
router.get('/candidates/:id', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM driver_candidates WHERE id = $1',
            [req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update candidate status
router.put('/candidates/:id/status', async (req, res) => {
    try {
        const { status } = req.body;
        const result = await db.query(
            'UPDATE driver_candidates SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
            [status, req.params.id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Log outreach attempt
router.post('/candidates/:id/outreach', async (req, res) => {
    try {
        const { method, message, response } = req.body;
        await db.query(
            `INSERT INTO driver_outreach_history (candidate_id, outreach_method, message_content, response, sent_at)
             VALUES ($1, $2, $3, $4, NOW())`,
            [req.params.id, method, message, response]
        );
        
        // Update outreach count
        await db.query(
            'UPDATE driver_candidates SET outreach_count = outreach_count + 1, last_outreach = NOW() WHERE id = $1',
            [req.params.id]
        );
        
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get metrics
router.get('/metrics', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
                SUM(CASE WHEN status = 'interested' THEN 1 ELSE 0 END) as interested,
                SUM(CASE WHEN status = 'onboarding' THEN 1 ELSE 0 END) as onboarding,
                SUM(CASE WHEN status = 'prospect' THEN 1 ELSE 0 END) as prospect
             FROM driver_candidates`
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
