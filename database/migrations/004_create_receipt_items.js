module.exports = {
  name: "005_create_receipt_items",

  up(db) {
    db.exec(`

CREATE TABLE IF NOT EXISTS receipt_items(

id INTEGER PRIMARY KEY AUTOINCREMENT,

receipt_id INTEGER NOT NULL,

product_id INTEGER,

product_name TEXT NOT NULL,

barcode TEXT,

price REAL NOT NULL,

quantity INTEGER NOT NULL,

subtotal REAL NOT NULL,

created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

FOREIGN KEY(receipt_id) REFERENCES receipts(id),

FOREIGN KEY(product_id) REFERENCES products(id)

);

CREATE INDEX IF NOT EXISTS idx_receipt_items_receipt

ON receipt_items(receipt_id);

`);
  },
};
