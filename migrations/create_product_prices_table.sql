CREATE TABLE if NOT EXISTS product_prices (
  id SERIAL PRIMARY KEY,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  ori_currency VARCHAR(10) DEFAULT 'usd',
  currency VARCHAR(10) DEFAULT 'usd',
  ori_price NUMERIC,
  price NUMERIC,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create a unique index on product_id to resolve conflicts
CREATE UNIQUE INDEX unique_product_id_idx ON product_prices (product_id);