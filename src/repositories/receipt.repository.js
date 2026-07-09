const query = require("../../database/query");

class ReceiptRepository {
  createReceipt({ receipt_no, total_amount, payment_method }) {
    const result = query.run(
      `
            INSERT INTO receipts(
                receipt_no,
                total_amount,
                payment_method
            )
            VALUES(?,?,?)
            `,
      [receipt_no, total_amount, payment_method],
    );

    return result.lastInsertRowid;
  }

  findById(id) {
    return query.get(
      `
    SELECT
      r.id,
      r.receipt_no,
      r.total_amount,
      r.payment_method,
      r.created_at
    FROM receipts r
    WHERE r.id = ?
    `,
      [id],
    );
  }

  findItems(receipt_id) {
    return query.all(
      `
SELECT

product_name,

barcode,

price,

quantity,

subtotal

FROM receipt_items

WHERE receipt_id=?

ORDER BY id

`,

      [receipt_id],
    );
  }
}

module.exports = new ReceiptRepository();
