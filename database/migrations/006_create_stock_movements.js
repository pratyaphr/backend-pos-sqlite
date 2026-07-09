module.exports = {
  name: "006_create_stock_movements",

  up(db) {
    db.exec(`
    CREATE TABLE stock_movements (

        id INTEGER PRIMARY KEY AUTOINCREMENT,

        product_id INTEGER NOT NULL,

        type TEXT NOT NULL,

        quantity INTEGER NOT NULL,

        reference_id INTEGER,

        note TEXT,

        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

        FOREIGN KEY(product_id)
            REFERENCES products(id)

    );
`);

    db.exec(`
    CREATE INDEX idx_stock_product
    ON stock_movements(product_id);
`);

    db.exec(`
    CREATE INDEX idx_stock_created
    ON stock_movements(created_at);
`);
  },
};
