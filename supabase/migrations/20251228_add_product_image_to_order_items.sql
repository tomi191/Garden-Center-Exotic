-- Add product_image column to b2b_order_items
ALTER TABLE b2b_order_items
ADD COLUMN IF NOT EXISTS product_image TEXT;

-- Add price_unit column for display purposes
ALTER TABLE b2b_order_items
ADD COLUMN IF NOT EXISTS price_unit TEXT DEFAULT 'лв';
