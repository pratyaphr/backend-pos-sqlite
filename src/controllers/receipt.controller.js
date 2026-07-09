const service = require("../services/receipt.service");

class ReceiptController {
  create(req, res, next) {
    try {
      const receipt_id = service.create(req.body);

      return res.status(201).json({
        success: true,
        message: "Sale completed",
        receipt_id,
      });
    } catch (err) {
      next(err);
    }
  }

  getById(req, res, next) {
    try {
      const receipt = service.getById(req.params.id);
      console.log("getById");

      return res.json({
        success: true,

        data: receipt,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ReceiptController();
