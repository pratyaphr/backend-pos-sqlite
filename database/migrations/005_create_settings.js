module.exports = {
  name: "006_create_settings",

  up(db) {
    db.exec(`

CREATE TABLE IF NOT EXISTS settings(

id INTEGER PRIMARY KEY CHECK(id=1),

shop_name TEXT,

phone TEXT,

address TEXT,

tax_no TEXT,

receipt_footer TEXT,

logo TEXT,

created_at TEXT DEFAULT CURRENT_TIMESTAMP,

updated_at TEXT DEFAULT CURRENT_TIMESTAMP

);

`);
  },
};
