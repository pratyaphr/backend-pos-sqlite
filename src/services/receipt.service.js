const AppError = require("../utils/AppError");
const productRepo = require("../repositories/product.repository");
const receiptRepo = require("../repositories/receipt.repository");
const stockMovementRepo = require("../repositories/stockMovement.repository");
const receiptItemRepo = require("../repositories/receiptItem.repository");
const query = require("../../database/query");

function generateReceiptNo() {
  return "RC-" + Date.now();
}

class ReceiptService {
  create(data) {
    return query.transaction(() => {
      let total = 0;

      const receiptItems = [];

      // 1. check products + calculate total
      data.items.forEach((item) => {
        const product = productRepo.findById(item.product_id);
        console.log("ReceiptService", product);

        if (!product) {
          throw new AppError("Product not found", 404);
        }

        if (product.stock_qty < item.quantity) {
          throw new AppError("Stock not enough", 400);
        }

        const subtotal = product.price * item.quantity;

        total += subtotal;

        receiptItems.push({
          product_id: product.id,
          product_name: product.name,
          barcode: product.barcode,
          price: product.price,
          quantity: item.quantity,
          subtotal,
        });

        // update stock
        query.run(
          `
                    UPDATE products
                    SET stock_qty = stock_qty - ?,
                        updated_at = CURRENT_TIMESTAMP
                    WHERE id = ?
                    `,
          [item.quantity, product.id],
        );
      });

      // 2. create receipt
      const receipt_id = receiptRepo.createReceipt({
        receipt_no: generateReceiptNo(),
        total_amount: total,
        payment_method: data.payment_method,
      });

      // stockMovementRepo.create({
      //   product_id: product.id,

      //   type: "SALE",

      //   quantity: -item.quantity,

      //   reference_id: receipt_id,

      //   note: "Sale",
      // });

      // 3. insert items
      receiptItems.forEach((item) => {
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
            receipt_id,
            item.product_id,
            item.product_name,
            item.barcode,
            item.price,
            item.quantity,
            item.subtotal,
          ],
        );
      });

      return receipt_id;
    });
  }

  getById(id) {
    const receipt = receiptRepo.findById(id);

    if (!receipt) {
      throw new AppError("Receipt not found", 404);
    }

    receipt.items = receiptRepo.findItems(id);

    return receipt;
  }
}

module.exports = new ReceiptService();
