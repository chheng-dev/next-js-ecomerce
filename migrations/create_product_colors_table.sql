CREATE TABLE IF NOT EXISTS product_colors (
  product_id INT REFERENCES products(id) ON DELETE CASCADE,
  color_id INT REFERENCES colors(id) on DELETE CASCADE,
  PRIMARY KEY (product_id, color_id)
);