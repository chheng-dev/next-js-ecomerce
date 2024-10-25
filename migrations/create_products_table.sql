CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  ori_price DECIMAL (10, 2) NOT NULL,
  price DECIMAL (10, 2) NOT NULL,
  currency VARCHAR(5) DEFAULT 'usd',
  stock_quantity INTEGER NOT NULL DEFAULT 0,
  colors TEXT[] DEFAULT '{}',
  sizes TEXT[] DEFAULT '{}',
  discount DECIMAL(10, 2) DEFAULT 0.00,
  discount_type VARCHAR(50),
  brand_id INTEGER REFERENCES brands(id) ON DELETE SET NULL,
  category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

