-- THREE Driver Growth System Database Schema

-- Driver Recruiting Pipeline
CREATE TABLE IF NOT EXISTS recruiting_sources (
    id SERIAL PRIMARY KEY,
    source_name VARCHAR(100),
    type VARCHAR(50), -- 'lane_search', 'fmcsa', 'social', 'referral'
    status VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(150),
    email VARCHAR(100),
    phone VARCHAR(20),
    company VARCHAR(150),
    equipment VARCHAR(100),
    mc_number VARCHAR(20),
    authority_age INT,
    safety_rating FLOAT,
    source_id INT REFERENCES recruiting_sources(id),
    status VARCHAR(50), -- 'prospect', 'interested', 'onboarding', 'active', 'inactive'
    outreach_count INT DEFAULT 0,
    last_outreach TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Driver Onboarding Workflow
CREATE TABLE IF NOT EXISTS driver_applications (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES driver_candidates(id),
    w9_uploaded BOOLEAN DEFAULT FALSE,
    coi_uploaded BOOLEAN DEFAULT FALSE,
    mc_uploaded BOOLEAN DEFAULT FALSE,
    safety_docs_uploaded BOOLEAN DEFAULT FALSE,
    authority_verified BOOLEAN DEFAULT FALSE,
    insurance_verified BOOLEAN DEFAULT FALSE,
    safety_rating_verified BOOLEAN DEFAULT FALSE,
    equipment_verified BOOLEAN DEFAULT FALSE,
    status VARCHAR(50), -- 'pending', 'review', 'approved', 'rejected'
    approval_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_documents (
    id SERIAL PRIMARY KEY,
    application_id INT REFERENCES driver_applications(id),
    document_type VARCHAR(50), -- 'w9', 'coi', 'mc', 'safety_docs'
    file_path VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    verified_at TIMESTAMP,
    verified_by VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS driver_rates (
    id SERIAL PRIMARY KEY,
    driver_id INT,
    lane VARCHAR(100),
    rate_per_mile DECIMAL(5, 2),
    effective_date DATE,
    end_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Driver Retention & Engagement
CREATE TABLE IF NOT EXISTS driver_preferences (
    id SERIAL PRIMARY KEY,
    driver_id INT,
    home_time_preference VARCHAR(50), -- 'weekly', 'bi-weekly', 'monthly'
    preferred_lanes TEXT,
    minimum_rate DECIMAL(5, 2),
    preferred_brokers TEXT,
    equipment_restrictions TEXT,
    eld_preference VARCHAR(50),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_check_ins (
    id SERIAL PRIMARY KEY,
    driver_id INT,
    check_in_date TIMESTAMP,
    question TEXT,
    response TEXT,
    sentiment VARCHAR(20), -- 'positive', 'neutral', 'negative'
    action_needed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_communication (
    id SERIAL PRIMARY KEY,
    driver_id INT,
    communication_type VARCHAR(50), -- 'sms', 'email', 'in_app', 'call'
    subject VARCHAR(255),
    message TEXT,
    sent_at TIMESTAMP,
    read_at TIMESTAMP,
    response VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_referrals (
    id SERIAL PRIMARY KEY,
    referrer_driver_id INT REFERENCES driver_candidates(id),
    referred_driver_id INT REFERENCES driver_candidates(id),
    bonus_amount DECIMAL(8, 2),
    bonus_status VARCHAR(50), -- 'pending', 'earned', 'paid'
    bonus_paid_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_accessorials (
    id SERIAL PRIMARY KEY,
    driver_id INT,
    load_id INT,
    type VARCHAR(50), -- 'detention', 'layover', 'tonu', 'lumper'
    amount DECIMAL(8, 2),
    status VARCHAR(50), -- 'pending', 'approved', 'paid'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMP,
    paid_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_outreach_history (
    id SERIAL PRIMARY KEY,
    candidate_id INT REFERENCES driver_candidates(id),
    outreach_method VARCHAR(50), -- 'sms', 'email', 'call', 'message'
    message_content TEXT,
    response VARCHAR(255),
    response_time INT, -- minutes
    sent_at TIMESTAMP,
    responded_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Analytics & Metrics
CREATE TABLE IF NOT EXISTS recruiting_metrics (
    id SERIAL PRIMARY KEY,
    date DATE,
    source_id INT REFERENCES recruiting_sources(id),
    outreach_count INT,
    interested_count INT,
    onboarded_count INT,
    conversion_rate FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS driver_retention_metrics (
    id SERIAL PRIMARY KEY,
    date DATE,
    active_drivers INT,
    churned_drivers INT,
    retention_rate FLOAT,
    avg_tenure_days INT,
    nps_score FLOAT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
