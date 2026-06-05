#!/usr/bin/env node
/**
 * Seed recruiting candidates into database
 */

const pool = require('./db');
const recruitingData = require('./recruiting-seed-data');

async function seedCandidates() {
    try {
        console.log('🌱 Seeding recruiting candidates...');
        
        for (const candidate of recruitingData) {
            const result = await pool.query(
                `INSERT INTO driver_candidates 
                 (name, email, phone, company, equipment, mc_number, authority_age, safety_rating, source_id, status)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
                 ON CONFLICT (email) DO NOTHING
                 RETURNING *`,
                [
                    candidate.name,
                    candidate.email,
                    candidate.phone,
                    candidate.company,
                    candidate.equipment,
                    candidate.mc_number,
                    candidate.authority_age,
                    candidate.safety_rating,
                    candidate.source_id,
                    candidate.status
                ]
            );
            
            if (result.rows.length > 0) {
                console.log(`✓ Added: ${candidate.name}`);
            }
        }
        
        console.log(`\n✅ Seeded ${recruitingData.length} candidates`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    }
}

seedCandidates();
