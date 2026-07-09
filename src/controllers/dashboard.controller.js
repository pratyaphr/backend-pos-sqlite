const service = require("../services/dashboard.service");
const Response = require("../utils/response");

class DashboardController {
  getDashboard(req, res, next) {
    try {
      return Response.success(res, service.getDashboard());
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DashboardController();
