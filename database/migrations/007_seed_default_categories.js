module.exports = {
  name: "007_seed_default_categories",

  up(db) {
    db.exec(`
        INSERT INTO categories (name)
        VALUES
        ('อื่นๆ');
    `);
  },
};
