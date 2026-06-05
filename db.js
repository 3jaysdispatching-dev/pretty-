// Database connection pool
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://dispatchos:dispatchos123@localhost:5432/dispatchos',
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
});

// Seed recruiting candidates and sources on startup
setTimeout(() => {
  pool.query(`SELECT COUNT(*) FROM recruiting_sources`).then(result => {
    if (result.rows[0].count === 0) {
      const sources = [
        { source_name: 'Lane Search - DAT/Truckstop/123', type: 'lane_search', status: 'active' },
        { source_name: 'FMCSA Data Mining', type: 'fmcsa', status: 'active' },
        { source_name: 'Social Media Recruiting', type: 'social', status: 'active' },
        { source_name: 'Driver Referral Network', type: 'referral', status: 'active' }
      ];
      
      sources.forEach(s => {
        pool.query(
          `INSERT INTO recruiting_sources (source_name, type, status) VALUES ($1, $2, $3)`,
          [s.source_name, s.type, s.status]
        ).catch(e => {});
      });
    }
  }).catch(e => {});
  
  pool.query(`SELECT COUNT(*) FROM driver_candidates`).then(result => {
    if (result.rows[0].count === 0) {
      const candidates = [
        { name: "Marcus Johnson", email: "marcus.j@trucking.com", phone: "615-555-0142", company: "Johnson Logistics", equipment: "Dry Van", mc_number: "MC-847291", authority_age: 12, safety_rating: 8.5, source_id: 1, status: "prospect" },
        { name: "Angela Martinez", email: "angela.m@carriers.com", phone: "512-555-0183", company: "Southwest Carriers", equipment: "Reefer", mc_number: "MC-924561", authority_age: 8, safety_rating: 8.9, source_id: 1, status: "interested" },
        { name: "David Chen", email: "david.c@dispatch.com", phone: "415-555-0156", company: "Pacific Freight", equipment: "Flatbed", mc_number: "MC-741852", authority_age: 15, safety_rating: 9.2, source_id: 1, status: "prospect" },
        { name: "Sarah Williams", email: "sarah.w@trucksales.com", phone: "770-555-0147", company: "Georgia Logistics", equipment: "Dry Van", mc_number: "MC-528963", authority_age: 7, safety_rating: 8.1, source_id: 1, status: "interested" },
        { name: "James Rodriguez", email: "james.r@carrier.com", phone: "505-555-0129", company: "High Plains Transport", equipment: "Tanker", mc_number: "MC-615928", authority_age: 10, safety_rating: 7.9, source_id: 2, status: "prospect" },
        { name: "Michelle Lee", email: "michelle.l@freight.com", phone: "206-555-0174", company: "Pacific Northwest Freight", equipment: "Dry Van", mc_number: "MC-374829", authority_age: 6, safety_rating: 8.6, source_id: 2, status: "prospect" },
        { name: "Kevin Taylor", email: "kevin.t@trucking.net", phone: "617-555-0198", company: "Northeast Haulers", equipment: "Flatbed", mc_number: "MC-092847", authority_age: 11, safety_rating: 8.3, source_id: 2, status: "interested" },
        { name: "Lisa Anderson", email: "lisa.a@dispatch.net", phone: "305-555-0165", company: "Florida Freight Services", equipment: "Reefer", mc_number: "MC-847362", authority_age: 9, safety_rating: 8.7, source_id: 2, status: "prospect" },
        { name: "Robert Thompson", email: "robert.t@facebook.com", phone: "502-555-0147", company: "Kentucky Transport", equipment: "Dry Van", mc_number: "MC-374928", authority_age: 5, safety_rating: 8.0, source_id: 3, status: "interested" },
        { name: "Jennifer Davis", email: "jen.d@instagram.com", phone: "713-555-0189", company: "Texas Logistics Hub", equipment: "Tanker", mc_number: "MC-628374", authority_age: 8, safety_rating: 8.4, source_id: 3, status: "prospect" },
        { name: "Christopher Brown", email: "chris.b@linkedin.com", phone: "602-555-0134", company: "Arizona Hauling", equipment: "Flatbed", mc_number: "MC-924738", authority_age: 7, safety_rating: 7.8, source_id: 3, status: "prospect" },
        { name: "Patricia Wilson", email: "pat.w@tiktok.com", phone: "816-555-0176", company: "Midwest Freight Alliance", equipment: "Dry Van", mc_number: "MC-517629", authority_age: 6, safety_rating: 8.5, source_id: 3, status: "interested" },
        { name: "Thomas Harris", email: "tom.h@referral.com", phone: "901-555-0143", company: "Memphis Carriers", equipment: "Reefer", mc_number: "MC-835294", authority_age: 13, safety_rating: 9.1, source_id: 4, status: "interested" },
        { name: "Elizabeth Moore", email: "liz.m@referral.com", phone: "404-555-0167", company: "Atlanta Freight", equipment: "Dry Van", mc_number: "MC-649382", authority_age: 9, safety_rating: 8.8, source_id: 4, status: "prospect" },
        { name: "Daniel Jackson", email: "dan.j@referral.com", phone: "214-555-0155", company: "Dallas Transport", equipment: "Flatbed", mc_number: "MC-748293", authority_age: 11, safety_rating: 8.9, source_id: 4, status: "interested" },
        { name: "Nancy White", email: "nancy.w@referral.com", phone: "317-555-0182", company: "Indianapolis Logistics", equipment: "Tanker", mc_number: "MC-927384", authority_age: 10, safety_rating: 8.2, source_id: 4, status: "prospect" }
      ];
      
      candidates.forEach(c => {
        pool.query(
          `INSERT INTO driver_candidates (name, email, phone, company, equipment, mc_number, authority_age, safety_rating, source_id, status)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
          [c.name, c.email, c.phone, c.company, c.equipment, c.mc_number, c.authority_age, c.safety_rating, c.source_id, c.status]
        ).catch(e => {});
      });
      console.log('✓ Seeded 16 recruiting candidates');
    }
  }).catch(e => console.error('Seed check failed:', e));
}, 2000);

module.exports = pool;
