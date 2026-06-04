/**
 * THREE Driver Growth System - API Routes
 * Recruiting, Onboarding, Retention endpoints
 */

const express = require('express');
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

// ===== ONBOARDING ROUTES =====

// Start onboarding
router.post('/onboarding/:candidateId/start', async (req, res) => {
    try {
        const candidateId = req.params.candidateId;
        
        // Create application
        const result = await db.query(
            `INSERT INTO driver_applications (candidate_id, status)
             VALUES ($1, 'pending')
             RETURNING *`,
            [candidateId]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Upload document
router.post('/onboarding/:applicationId/upload', async (req, res) => {
    try {
        const { document_type, file_path } = req.body;
        
        const result = await db.query(
            `INSERT INTO driver_documents (application_id, document_type, file_path)
             VALUES ($1, $2, $3)
             RETURNING *`,
            [req.params.applicationId, document_type, file_path]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get application status
router.get('/onboarding/:applicationId', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM driver_applications WHERE id = $1',
            [req.params.applicationId]
        );
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Approve application
router.put('/onboarding/:applicationId/approve', async (req, res) => {
    try {
        const result = await db.query(
            `UPDATE driver_applications 
             SET status = 'approved', approval_date = NOW(), updated_at = NOW()
             WHERE id = $1
             RETURNING *`,
            [req.params.applicationId]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ===== RETENTION ROUTES =====

// Get driver preferences
router.get('/drivers/:driverId/preferences', async (req, res) => {
    try {
        const result = await db.query(
            'SELECT * FROM driver_preferences WHERE driver_id = $1',
            [req.params.driverId]
        );
        res.json(result.rows[0] || {});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update driver preferences
router.put('/drivers/:driverId/preferences', async (req, res) => {
    try {
        const { home_time_preference, preferred_lanes, minimum_rate } = req.body;
        
        const result = await db.query(
            `UPDATE driver_preferences 
             SET home_time_preference = $1, preferred_lanes = $2, minimum_rate = $3, updated_at = NOW()
             WHERE driver_id = $4
             RETURNING *`,
            [home_time_preference, preferred_lanes, minimum_rate, req.params.driverId]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Log check-in
router.post('/drivers/:driverId/check-in', async (req, res) => {
    try {
        const { question, response } = req.body;
        
        const result = await db.query(
            `INSERT INTO driver_check_ins (driver_id, check_in_date, question, response)
             VALUES ($1, NOW(), $2, $3)
             RETURNING *`,
            [req.params.driverId, question, response]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// File accessorial
router.post('/drivers/:driverId/accessorial', async (req, res) => {
    try {
        const { type, amount, description, load_id } = req.body;
        
        const result = await db.query(
            `INSERT INTO driver_accessorials (driver_id, load_id, type, amount, description, status)
             VALUES ($1, $2, $3, $4, $5, 'pending')
             RETURNING *`,
            [req.params.driverId, load_id, type, amount, description]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get driver referrals
router.get('/drivers/:driverId/referrals', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT * FROM driver_referrals WHERE referrer_driver_id = $1 ORDER BY created_at DESC`,
            [req.params.driverId]
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Create referral
router.post('/drivers/:driverId/referral', async (req, res) => {
    try {
        const { referred_driver_id } = req.body;
        
        const result = await db.query(
            `INSERT INTO driver_referrals (referrer_driver_id, referred_driver_id, bonus_status)
             VALUES ($1, $2, 'pending')
             RETURNING *`,
            [req.params.driverId, referred_driver_id]
        );
        
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get metrics
router.get('/metrics/recruiting', async (req, res) => {
    try {
        const result = await db.query(
            `SELECT 
                DATE(created_at) as date,
                COUNT(*) as total,
                SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) as active,
                SUM(CASE WHEN status = 'interested' THEN 1 ELSE 0 END) as interested
             FROM driver_candidates
             GROUP BY DATE(created_at)
             ORDER BY date DESC`
        );
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
