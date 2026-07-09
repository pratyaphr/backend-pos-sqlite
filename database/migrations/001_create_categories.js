module.exports = {
  name: "002_create_categories",

  up(db) {
    db.exec(`

        CREATE TABLE IF NOT EXISTS categories(

            id INTEGER PRIMARY KEY AUTOINCREMENT,

            name TEXT NOT NULL UNIQUE,

            active INTEGER DEFAULT 1,
            
            created_at TEXT DEFAULT CURRENT_TIMESTAMP,

            updated_at TEXT DEFAULT CURRENT_TIMESTAMP

        );

        `);
  },
};
