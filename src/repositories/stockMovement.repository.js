const query = require("../../database/query");

class StockMovementRepository {
  create(data) {
    query.run(
      `
            INSERT INTO stock_movements(
                product_id,
                type,
                quantity,
                reference_id,
                note
            )
            VALUES(?,?,?,?,?)
            `,
      [data.product_id, data.type, data.quantity, data.reference_id, data.note],
    );
  }

  findByProduct(productId) {
    return query.all(
      `
            SELECT *
            FROM stock_movements
            WHERE product_id = ?
            ORDER BY id DESC
            `,
      [productId],
    );
  }
}

module.exports = new StockMovementRepository();
