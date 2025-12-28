-- Create b2b_orders table
CREATE TABLE IF NOT EXISTS b2b_orders (
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
CREATE TABLE IF NOT EXISTS b2b_order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES b2b_orders(id) ON DELETE CASCADE,
  product_id TEXT,
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  total_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_b2b_orders_company_id ON b2b_orders(company_id);
CREATE INDEX IF NOT EXISTS idx_b2b_orders_status ON b2b_orders(status);
CREATE INDEX IF NOT EXISTS idx_b2b_orders_created_at ON b2b_orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_b2b_order_items_order_id ON b2b_order_items(order_id);

-- Enable RLS
ALTER TABLE b2b_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE b2b_order_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for b2b_orders
CREATE POLICY "B2B companies can view own orders" ON b2b_orders
  FOR SELECT USING (auth.uid()::text = company_id::text);

CREATE POLICY "B2B companies can insert own orders" ON b2b_orders
  FOR INSERT WITH CHECK (auth.uid()::text = company_id::text);

CREATE POLICY "Service role has full access to orders" ON b2b_orders
  FOR ALL USING (auth.role() = 'service_role');

-- RLS Policies for b2b_order_items
CREATE POLICY "B2B companies can view own order items" ON b2b_order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM b2b_orders
      WHERE b2b_orders.id = b2b_order_items.order_id
      AND auth.uid()::text = b2b_orders.company_id::text
    )
  );

CREATE POLICY "Service role has full access to order items" ON b2b_order_items
  FOR ALL USING (auth.role() = 'service_role');
