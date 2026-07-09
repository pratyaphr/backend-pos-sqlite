const fs = require("fs");
const path = require("path");
const db = require("../src/config/database");

function migrate() {
  // สร้างตาราง migrations ถ้ายังไม่มี
  db.exec(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const migrationDir = path.join(__dirname, "migrations");

  const files = fs
    .readdirSync(migrationDir)
    .filter((file) => file.endsWith(".js"))
    .sort();

  for (const file of files) {
    const migration = require(path.join(migrationDir, file));

    const exists = db
      .prepare("SELECT 1 FROM migrations WHERE name = ?")
      .get(migration.name);

    if (exists) {
      console.log(`⏩ Skip ${migration.name}`);
      continue;
    }

    console.log(`🚀 Run ${migration.name}`);

    const transaction = db.transaction(() => {
      migration.up(db);

      db.prepare(
        `
        INSERT INTO migrations(name)
        VALUES(?)
      `,
      ).run(migration.name);
    });

    transaction();

    console.log(`✅ Success ${migration.name}`);
  }
}

module.exports = migrate;
