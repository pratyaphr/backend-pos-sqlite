const query = require("../../database/query");

class ProductRepository {
  findAll({ search = "", category_id, limit, offset }) {
    let sql = `
        SELECT
            p.id,
            p.name,
            p.barcode,
            p.price,
            p.stock_qty,
            p.active,
            c.name AS category
        FROM products p
        LEFT JOIN categories c
            ON c.id = p.category_id
        WHERE p.active = 1
    `;

    const params = [];

    if (search) {
      sql += `
            AND (
                p.name LIKE ?
                OR p.barcode LIKE ?
            )
        `;

      params.push(`%${search}%`);
      params.push(`%${search}%`);
    }

    if (category_id) {
      sql += ` AND p.category_id = ? `;
      params.push(category_id);
    }

    sql += `
        ORDER BY p.id DESC
        LIMIT ?
        OFFSET ?
    `;

    params.push(limit);
    params.push(offset);

    return query.all(sql, params);
  }

  findList({ search = "", category_id, limit, offset }) {
    let sql = `
        SELECT
            p.id,
            p.name,
            p.barcode,
            p.price,
            p.stock_qty,
            c.name AS category
        FROM products p
        LEFT JOIN categories c ON c.id = p.category_id
        WHERE p.active = 1
    `;

    const params = [];

    if (search) {
      sql += `
            AND (
                p.name LIKE ?
                OR p.barcode LIKE ?
            )
        `;
      params.push(`%${search}%`, `%${search}%`);
    }

    if (category_id) {
      sql += ` AND p.category_id = ? `;
      params.push(category_id);
    }

    sql += `
        ORDER BY p.id DESC
        LIMIT ? OFFSET ?
    `;

    params.push(limit, offset);

    return query.all(sql, params);
  }

  count({ search = "", category_id }) {
    let sql = `
        SELECT COUNT(*) total
        FROM products
        WHERE active = 1
    `;

    const params = [];

    if (search) {
      sql += `
            AND (
                name LIKE ?
                OR barcode LIKE ?
            )
        `;

      params.push(`%${search}%`);
      params.push(`%${search}%`);
    }

    if (category_id) {
      sql += ` AND category_id = ?`;

      params.push(category_id);
    }

    return query.get(sql, params).total;
  }

  findById(id) {
    return query.get(
      `
        SELECT *
        FROM products
        WHERE id = ?
        `,
      [id],
    );
  }

  findByBarcode(barcode) {
    return query.get(
      `
        SELECT *
        FROM products
        WHERE barcode = ?
    `,
      [barcode],
    );
  }

  create(product) {
    const result = query.run(
      `
        INSERT INTO products(

            category_id,
            barcode,
            name,
            cost,
            price,
            stock_qty

        )
        VALUES(
            ?,?,?,?,?,?
        )
    `,

      [
        product.category_id,
        product.barcode,
        product.name,
        product.cost,
        product.price,
        product.stock_qty,
      ],
    );

    return result.lastInsertRowid;
  }

  update(id, product) {
    query.run(
      `
        UPDATE products
        SET
            category_id = ?,
            barcode = ?,
            name = ?,
            cost = ?,
            price = ?,
            stock_qty = ?,
            active = ?,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        `,
      [
        product.category_id,
        product.barcode,
        product.name,
        product.cost,
        product.price,
        product.stock_qty,
        product.active,
        id,
      ],
    );
  }

  delete(id) {
    query.run(
      `
        UPDATE products
        SET active = 0,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
        `,
      [id],
    );
  }
}

module.exports = new ProductRepository();
