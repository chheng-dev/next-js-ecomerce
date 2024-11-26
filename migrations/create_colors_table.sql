CREATE TABLE IF NOT EXISTS colors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  code VARCHAR(7) NOT NULL
);

INSERT INTO colors (name, code) VALUES ('White', '#FFFFFF');
INSERT INTO colors (name, code) VALUES ('Brown', '#8B4513');
INSERT INTO colors (name, code) VALUES ('Gray', '#808080');
INSERT INTO colors (name, code) VALUES ('Orange', '#FFA500');
INSERT INTO colors (name, code) VALUES ('Blue', '#0000FF');
INSERT INTO colors (name, code) VALUES ('Yellow', '#FFFF00');
INSERT INTO colors (name, code) VALUES ('Green', '#008000');
INSERT INTO colors (name, code) VALUES ('Red', '#FF0000');
INSERT INTO colors (name, code) VALUES ('Purple', '#800080');
INSERT INTO colors (name, code) VALUES ('Teal', '#008080');
INSERT INTO colors (name, code) VALUES ('Gold', '#FFD700');
INSERT INTO colors (name, code) VALUES ('Silver', '#C0C0C0');
