const query = require("../../database/query");

class ReceiptItemRepository {
  create(items) {
    const stmt = query.run;

    items.forEach((item) => {
      query.run(
        `
                INSERT INTO receipt_items(
                    receipt_id,
                    product_id,
                    product_name,
                    barcode,
                    price,
                    quantity,
                    subtotal
                )
                VALUES(?,?,?,?,?,?,?)
                `,
        [
          item.receipt_id,
          item.product_id,
          item.product_name,
          item.barcode,
          item.price,
          item.quantity,
          item.subtotal,
        ],
      );
    });
  }
}

module.exports = new ReceiptItemRepository();
