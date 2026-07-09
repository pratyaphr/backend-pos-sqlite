const Database = require("better-sqlite3");
const path = require("path");

const db = new Database(path.join(process.cwd(), "database", "pos.db"));

// เปิด Foreign Key
db.pragma("foreign_keys = ON");

// เพิ่มประสิทธิภาพ
db.pragma("journal_mode = WAL");

module.exports = db;
