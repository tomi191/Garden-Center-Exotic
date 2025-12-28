-- Fix b2b_orders table - add missing columns if table exists
-- Run this if you get "column not found" errors

-- Drop existing tables if they have wrong schema and recreate
DROP TABLE IF EXISTS b2b_order_items CASCADE;
DROP TABLE IF EXISTS b2b_orders CASCADE;

-- Create b2b_orders table with correct schema
CREATE TABLE b2b_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID NOT NULL REFERENCES b2b_companies(id) ON DELETE CASCADE,
  order_number TEXT NOT NULL UNIQUE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  discount_percent DECIMAL(5,2) NOT NULL DEFAULT 0,
  discount_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0,
  notes TEXT,
  tracking_number TEXT,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  shipped_at TIMESTAMP WITH TIME ZONE,
  delivered_at TIMESTAMP WITH TIME ZONE
);

-- Create b2b_order_items table
CREATE TABLE b2b_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES b2b_orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_b2b_orders_company_id ON b2b_orders(company_id);
CREATE INDEX idx_b2b_orders_status ON b2b_orders(status);
CREATE INDEX idx_b2b_orders_created_at ON b2b_orders(created_at DESC);
CREATE INDEX idx_b2b_order_items_order_id ON b2b_order_items(order_id);
