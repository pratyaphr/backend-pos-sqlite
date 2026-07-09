module.exports = {
  name: "003_create_products",

  up(db) {
    db.exec(`

CREATE TABLE IF NOT EXISTS products(

id INTEGER PRIMARY KEY AUTOINCREMENT,

category_id INTEGER NOT NULL,

barcode TEXT NOT NULL UNIQUE,

name TEXT NOT NULL,

cost REAL DEFAULT 0,

price REAL NOT NULL,

stock_qty INTEGER DEFAULT 0,

active INTEGER DEFAULT 1,

created_at TEXT DEFAULT CURRENT_TIMESTAMP,

updated_at TEXT DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY(category_id)

REFERENCES categories(id)

);

CREATE INDEX IF NOT EXISTS idx_products_barcode
ON products(barcode);

CREATE INDEX IF NOT EXISTS idx_products_name
ON products(name);

`);
  },
};
