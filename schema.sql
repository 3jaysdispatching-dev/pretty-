-- DispatchOS PostgreSQL Database Schema

-- Create tables
CREATE TABLE IF NOT EXISTS companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  mc_number VARCHAR(20),
  dot_number VARCHAR(20),
  dispatcher_email VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS drivers (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  email VARCHAR(255),
  truck_id VARCHAR(50),
  home_base VARCHAR(255),
  cdl_class VARCHAR(10),
  license_exp DATE,
  status VARCHAR(50) DEFAULT 'available',
  hos_remaining INTEGER DEFAULT 14,
  current_load_id INTEGER,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  eld_status VARCHAR(50) DEFAULT 'connected',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS loads (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id),
  load_number VARCHAR(50) NOT NULL UNIQUE,
  origin VARCHAR(255) NOT NULL,
  destination VARCHAR(255) NOT NULL,
  commodity VARCHAR(255),
  weight_lbs INTEGER,
  driver_id INTEGER REFERENCES drivers(id),
  status VARCHAR(50) DEFAULT 'pending',
  rate DECIMAL(10, 2),
  priority VARCHAR(50) DEFAULT 'normal',
  shipper_name VARCHAR(255),
  customer_name VARCHAR(255),
  pickup_date DATE,
  delivery_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS invoices (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id),
  invoice_number VARCHAR(50) NOT NULL UNIQUE,
  load_id INTEGER NOT NULL REFERENCES loads(id),
  customer_name VARCHAR(255),
  linehaul_rate DECIMAL(10, 2),
  fuel_surcharge DECIMAL(10, 2),
  detention_charge DECIMAL(10, 2),
  driver_payout DECIMAL(10, 2),
  total_amount DECIMAL(10, 2),
  status VARCHAR(50) DEFAULT 'pending',
  due_date DATE,
  paid_date DATE,
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id),
  driver_id INTEGER REFERENCES drivers(id),
  type VARCHAR(50),
  title VARCHAR(255),
  message TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS compliance_logs (
  id SERIAL PRIMARY KEY,
  driver_id INTEGER NOT NULL REFERENCES drivers(id),
  violation_type VARCHAR(255),
  description TEXT,
  severity VARCHAR(50),
  resolved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS rate_engine (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id),
  rate_type VARCHAR(50) NOT NULL,
  rate_value DECIMAL(10, 4),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  id SERIAL PRIMARY KEY,
  company_id INTEGER NOT NULL REFERENCES companies(id),
  mapbox_token TEXT,
  twilio_sid VARCHAR(255),
  twilio_token VARCHAR(255),
  twilio_from VARCHAR(20),
  samsara_api_key TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_drivers_company ON drivers(company_id);
CREATE INDEX idx_drivers_status ON drivers(status);
CREATE INDEX idx_loads_company ON loads(company_id);
CREATE INDEX idx_loads_driver ON loads(driver_id);
CREATE INDEX idx_loads_status ON loads(status);
CREATE INDEX idx_invoices_company ON invoices(company_id);
CREATE INDEX idx_invoices_status ON invoices(status);
CREATE INDEX idx_notifications_company ON notifications(company_id);
CREATE INDEX idx_notifications_read ON notifications(read);

-- Insert default company
INSERT INTO companies (name, mc_number, dot_number, dispatcher_email)
VALUES ('DispatchOS Demo', 'MC-123456', 'USDOT-123456', 'dispatch@dispatchos.demo')
ON CONFLICT (name) DO NOTHING;
