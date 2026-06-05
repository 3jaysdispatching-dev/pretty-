/**
 * THREE — Add candidates via API
 * Copy & paste this into your browser console or curl
 */

const candidates = [
    { name: "Marcus Johnson", email: "marcus.j@trucking.com", phone: "615-555-0142", company: "Johnson Logistics", equipment: "Dry Van", source_id: 1 },
    { name: "Angela Martinez", email: "angela.m@carriers.com", phone: "512-555-0183", company: "Southwest Carriers", equipment: "Reefer", source_id: 1 },
    { name: "David Chen", email: "david.c@dispatch.com", phone: "415-555-0156", company: "Pacific Freight", equipment: "Flatbed", source_id: 1 },
    { name: "Sarah Williams", email: "sarah.w@trucksales.com", phone: "770-555-0147", company: "Georgia Logistics", equipment: "Dry Van", source_id: 1 },
    { name: "James Rodriguez", email: "james.r@carrier.com", phone: "505-555-0129", company: "High Plains Transport", equipment: "Tanker", source_id: 2 },
    { name: "Michelle Lee", email: "michelle.l@freight.com", phone: "206-555-0174", company: "Pacific Northwest Freight", equipment: "Dry Van", source_id: 2 },
    { name: "Kevin Taylor", email: "kevin.t@trucking.net", phone: "617-555-0198", company: "Northeast Haulers", equipment: "Flatbed", source_id: 2 },
    { name: "Lisa Anderson", email: "lisa.a@dispatch.net", phone: "305-555-0165", company: "Florida Freight Services", equipment: "Reefer", source_id: 2 },
    { name: "Robert Thompson", email: "robert.t@facebook.com", phone: "502-555-0147", company: "Kentucky Transport", equipment: "Dry Van", source_id: 3 },
    { name: "Jennifer Davis", email: "jen.d@instagram.com", phone: "713-555-0189", company: "Texas Logistics Hub", equipment: "Tanker", source_id: 3 },
    { name: "Christopher Brown", email: "chris.b@linkedin.com", phone: "602-555-0134", company: "Arizona Hauling", equipment: "Flatbed", source_id: 3 },
    { name: "Patricia Wilson", email: "pat.w@tiktok.com", phone: "816-555-0176", company: "Midwest Freight Alliance", equipment: "Dry Van", source_id: 3 },
    { name: "Thomas Harris", email: "tom.h@referral.com", phone: "901-555-0143", company: "Memphis Carriers", equipment: "Reefer", source_id: 4 },
    { name: "Elizabeth Moore", email: "liz.m@referral.com", phone: "404-555-0167", company: "Atlanta Freight", equipment: "Dry Van", source_id: 4 },
    { name: "Daniel Jackson", email: "dan.j@referral.com", phone: "214-555-0155", company: "Dallas Transport", equipment: "Flatbed", source_id: 4 },
    { name: "Nancy White", email: "nancy.w@referral.com", phone: "317-555-0182", company: "Indianapolis Logistics", equipment: "Tanker", source_id: 4 }
];

// Add all candidates
(async () => {
    for (const candidate of candidates) {
        try {
            const res = await fetch('/api/driver-growth/candidates', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(candidate)
            });
            const data = await res.json();
            console.log(`✓ Added: ${candidate.name}`);
        } catch (error) {
            console.error(`✗ Failed: ${candidate.name}`, error.message);
        }
    }
    console.log('✅ All 16 candidates added to recruiting pipeline');
})();
