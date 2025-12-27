-- =============================================
-- B2B Schema for Garden Center Exotic
-- Run this in Supabase SQL Editor
-- =============================================

-- B2B Companies Table
CREATE TABLE IF NOT EXISTS b2b_companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name VARCHAR(255) NOT NULL,
  eik VARCHAR(13) UNIQUE NOT NULL,
  mol VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  address TEXT,
  city VARCHAR(100),

  -- Authentication
  password_hash VARCHAR(255) NOT NULL,

  -- Status and Tier
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'suspended')),
  tier VARCHAR(20) CHECK (tier IN ('silver', 'gold', 'platinum')),
  discount_percent INTEGER DEFAULT 10,

  -- Payment Terms
  payment_terms INTEGER DEFAULT 0,
  credit_limit DECIMAL(10,2) DEFAULT 0,

  -- Meta
  notes TEXT,
  approved_by UUID REFERENCES "User"(id),
  approved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- B2B Orders Table
CREATE TABLE IF NOT EXISTS b2b_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES b2b_companies(id) ON DELETE CASCADE,
  order_number VARCHAR(20) UNIQUE NOT NULL,

  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),

  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_percent INTEGER DEFAULT 0,
  discount_amount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL DEFAULT 0,

  delivery_date DATE,
  delivery_address TEXT,
  notes TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- B2B Order Items Table
CREATE TABLE IF NOT EXISTS b2b_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES b2b_orders(id) ON DELETE CASCADE,
  product_id VARCHAR(255) NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL,
  total_price DECIMAL(10,2) NOT NULL,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for better performance
CREATE INDEX IF NOT EXISTS idx_b2b_companies_email ON b2b_companies(email);
CREATE INDEX IF NOT EXISTS idx_b2b_companies_eik ON b2b_companies(eik);
CREATE INDEX IF NOT EXISTS idx_b2b_companies_status ON b2b_companies(status);
CREATE INDEX IF NOT EXISTS idx_b2b_orders_company ON b2b_orders(company_id);
CREATE INDEX IF NOT EXISTS idx_b2b_orders_status ON b2b_orders(status);
CREATE INDEX IF NOT EXISTS idx_b2b_order_items_order ON b2b_order_items(order_id);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for b2b_companies
DROP TRIGGER IF EXISTS update_b2b_companies_updated_at ON b2b_companies;
CREATE TRIGGER update_b2b_companies_updated_at
  BEFORE UPDATE ON b2b_companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to generate order number
CREATE OR REPLACE FUNCTION generate_order_number()
RETURNS TRIGGER AS $$
DECLARE
  year_part VARCHAR(4);
  seq_num INTEGER;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');

  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 10) AS INTEGER)), 0) + 1
  INTO seq_num
  FROM b2b_orders
  WHERE order_number LIKE 'B2B-' || year_part || '-%';

  NEW.order_number := 'B2B-' || year_part || '-' || LPAD(seq_num::TEXT, 4, '0');
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for auto-generating order numbers
DROP TRIGGER IF EXISTS generate_b2b_order_number ON b2b_orders;
CREATE TRIGGER generate_b2b_order_number
  BEFORE INSERT ON b2b_orders
  FOR EACH ROW
  WHEN (NEW.order_number IS NULL)
  EXECUTE FUNCTION generate_order_number();

-- Row Level Security (RLS)
ALTER TABLE b2b_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_order_items ENABLE ROW LEVEL SECURITY;

-- Policies for service role (admin operations)
CREATE POLICY "Service role full access to b2b_companies" ON b2b_companies
  FOR ALL USING (true);

CREATE POLICY "Service role full access to b2b_orders" ON b2b_orders
  FOR ALL USING (true);

CREATE POLICY "Service role full access to b2b_order_items" ON b2b_order_items
  FOR ALL USING (true);

-- =============================================
-- USAGE:
-- 1. Go to Supabase Dashboard > SQL Editor
-- 2. Copy and paste this entire script
-- 3. Click "Run"
-- =============================================
