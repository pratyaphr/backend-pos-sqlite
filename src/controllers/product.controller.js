const service = require("../services/product.service");
const Response = require("../utils/response");

class ProductController {
  getAll(req, res) {
    const result = service.getAll(req.query);
    console.log("getAll", result);

    return Response.paginated(res, result.products, result.pagination);
  }

  getList(req, res, next) {
    try {
      const result = service.getList(req.query);

      return Response.paginated(res, result.products, result.pagination);
    } catch (err) {
      next(err);
    }
  }

  create(req, res, next) {
    try {
      const id = service.create(req.body);

      return res.status(201).json({
        success: true,

        message: "Create product successfully",

        id,
      });
    } catch (error) {
      next(error);
    }
  }

  getById(req, res, next) {
    try {
      const data = service.getById(req.params.id);

      return res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  getByBarcode(req, res, next) {
    try {
      const data = service.getByBarcode(req.params.barcode);

      return res.json({
        success: true,
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  update(req, res, next) {
    try {
      service.update(req.params.id, req.body);

      return res.json({
        success: true,
        message: "Update product successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  delete(req, res, next) {
    try {
      service.delete(req.params.id);

      return res.json({
        success: true,
        message: "Delete product successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ProductController();
