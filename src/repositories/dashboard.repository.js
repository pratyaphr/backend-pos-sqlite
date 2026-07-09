const query = require("../../database/query");

class DashboardRepository {
  getSummary() {
    return {
      todaySales: query.get(`
            SELECT IFNULL(SUM(total_amount),0) total
            FROM receipts
            WHERE DATE(created_at)=DATE('now','localtime')
        `).total,

      todayReceipts: query.get(`
            SELECT COUNT(*) total
            FROM receipts
            WHERE DATE(created_at)=DATE('now','localtime')
        `).total,

      totalProducts: query.get(`
            SELECT COUNT(*) total
            FROM products
            WHERE active=1
        `).total,

      lowStockProducts: query.get(`
            SELECT COUNT(*) total
            FROM products
            WHERE stock_qty<=5
            AND active=1
        `).total,
    };
  }

  getSalesChart() {
    return query.all(`
        SELECT

            CAST(strftime('%d',created_at) AS INTEGER) date,

            SUM(total_amount) value

        FROM receipts

        WHERE strftime('%Y-%m',created_at)=strftime('%Y-%m','now','localtime')

        GROUP BY date

        ORDER BY date

    `);
  }

  getTopProducts(limit = 10) {
    return query.all(
      `
SELECT

ri.product_id,

ri.product_name name,

SUM(ri.quantity) quantity,

SUM(ri.subtotal) amount

FROM receipt_items ri

GROUP BY ri.product_id,ri.product_name

ORDER BY quantity DESC

LIMIT ?

`,
      [limit],
    );
  }

  getLatestReceipts(limit = 10) {
    return query.all(
      `
SELECT

receipt_no,

payment_method,

total_amount,

created_at

FROM receipts

ORDER BY id DESC

LIMIT ?

`,
      [limit],
    );
  }

  getPaymentSummary() {
    return query.all(
      `
SELECT

payment_method,

COUNT(*) total

FROM receipts

GROUP BY payment_method

`,
    );
  }
}

module.exports = new DashboardRepository();
