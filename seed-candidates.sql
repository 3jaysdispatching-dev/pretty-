-- Insert recruiting sources
INSERT INTO recruiting_sources (source_name, type, status) VALUES
('Lane Search - DAT/Truckstop/123', 'lane_search', 'active'),
('FMCSA Data Mining', 'fmcsa', 'active'),
('Social Media Recruiting', 'social', 'active'),
('Driver Referral Network', 'referral', 'active')
ON CONFLICT DO NOTHING;

-- Insert driver candidates
INSERT INTO driver_candidates (name, email, phone, company, equipment, mc_number, authority_age, safety_rating, source_id, status, outreach_count) VALUES
-- Lane Search
('Marcus Johnson', 'marcus.j@trucking.com', '615-555-0142', 'Johnson Logistics', 'Dry Van', 'MC-847291', 12, 8.5, 1, 'prospect', 0),
('Angela Martinez', 'angela.m@carriers.com', '512-555-0183', 'Southwest Carriers', 'Reefer', 'MC-924561', 8, 8.9, 1, 'interested', 1),
('David Chen', 'david.c@dispatch.com', '415-555-0156', 'Pacific Freight', 'Flatbed', 'MC-741852', 15, 9.2, 1, 'prospect', 0),
('Sarah Williams', 'sarah.w@trucksales.com', '770-555-0147', 'Georgia Logistics', 'Dry Van', 'MC-528963', 7, 8.1, 1, 'interested', 2),

-- FMCSA Data Mining
('James Rodriguez', 'james.r@carrier.com', '505-555-0129', 'High Plains Transport', 'Tanker', 'MC-615928', 10, 7.9, 2, 'prospect', 0),
('Michelle Lee', 'michelle.l@freight.com', '206-555-0174', 'Pacific Northwest Freight', 'Dry Van', 'MC-374829', 6, 8.6, 2, 'prospect', 1),
('Kevin Taylor', 'kevin.t@trucking.net', '617-555-0198', 'Northeast Haulers', 'Flatbed', 'MC-092847', 11, 8.3, 2, 'interested', 1),
('Lisa Anderson', 'lisa.a@dispatch.net', '305-555-0165', 'Florida Freight Services', 'Reefer', 'MC-847362', 9, 8.7, 2, 'prospect', 0),

-- Social Recruiting
('Robert Thompson', 'robert.t@facebook.com', '502-555-0147', 'Kentucky Transport', 'Dry Van', 'MC-374928', 5, 8.0, 3, 'interested', 2),
('Jennifer Davis', 'jen.d@instagram.com', '713-555-0189', 'Texas Logistics Hub', 'Tanker', 'MC-628374', 8, 8.4, 3, 'prospect', 1),
('Christopher Brown', 'chris.b@linkedin.com', '602-555-0134', 'Arizona Hauling', 'Flatbed', 'MC-924738', 7, 7.8, 3, 'prospect', 0),
('Patricia Wilson', 'pat.w@tiktok.com', '816-555-0176', 'Midwest Freight Alliance', 'Dry Van', 'MC-517629', 6, 8.5, 3, 'interested', 1),

-- Referral Network
('Thomas Harris', 'tom.h@referral.com', '901-555-0143', 'Memphis Carriers', 'Reefer', 'MC-835294', 13, 9.1, 4, 'interested', 3),
('Elizabeth Moore', 'liz.m@referral.com', '404-555-0167', 'Atlanta Freight', 'Dry Van', 'MC-649382', 9, 8.8, 4, 'prospect', 0),
('Daniel Jackson', 'dan.j@referral.com', '214-555-0155', 'Dallas Transport', 'Flatbed', 'MC-748293', 11, 8.9, 4, 'interested', 2),
('Nancy White', 'nancy.w@referral.com', '317-555-0182', 'Indianapolis Logistics', 'Tanker', 'MC-927384', 10, 8.2, 4, 'prospect', 1)
ON CONFLICT (email) DO NOTHING;
