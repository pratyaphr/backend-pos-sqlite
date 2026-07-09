module.exports = {
  name: "004_create_receipts",

  up(db) {
    db.exec(`

CREATE TABLE IF NOT EXISTS receipts(

id INTEGER PRIMARY KEY AUTOINCREMENT,

receipt_no TEXT UNIQUE,

total_amount REAL NOT NULL,

payment_method TEXT,

created_at TEXT DEFAULT CURRENT_TIMESTAMP,

updated_at TEXT DEFAULT CURRENT_TIMESTAMP);

CREATE INDEX IF NOT EXISTS idx_receipts_created_at

ON receipts(created_at);

`);
  },
};
