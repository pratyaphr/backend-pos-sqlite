const repository = require("../repositories/dashboard.repository");

class DashboardService {
  getDashboard() {
    return {
      summary: repository.getSummary(),

      salesChart: repository.getSalesChart(),

      topProducts: repository.getTopProducts(),

      latestReceipts: repository.getLatestReceipts(),

      paymentSummary: repository.getPaymentSummary(),
    };
  }
}

module.exports = new DashboardService();
