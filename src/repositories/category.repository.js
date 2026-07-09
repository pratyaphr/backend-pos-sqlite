const query = require("../../database/query");

class CategoryRepository {
  findAll() {
    return query.all(`
            SELECT
                id,
                name,
                created_at,
                updated_at
            FROM categories
            WHERE active = 1
            ORDER BY name ASC
        `);
  }

  findById(id) {
    return query.get(
      `
            SELECT *
            FROM categories
            WHERE id = ?
            `,
      [id],
    );
  }

  findByName(name) {
    return query.get(
      `
            SELECT *
            FROM categories
            WHERE name = ?
            `,
      [name],
    );
  }

  create(name) {
    const result = query.run(
      `
            INSERT INTO categories(name)
            VALUES(?)
            `,
      [name],
    );

    return result.lastInsertRowid;
  }

  update(id, name) {
    query.run(
      `
            UPDATE categories
            SET
                name = ?,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
      [name, id],
    );
  }

  delete(id) {
    query.run(
      `     
            UPDATE categories
            SET
                active = 0,
                updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
            `,
      [id],
    );
  }
}

module.exports = new CategoryRepository();
