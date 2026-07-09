const service = require("../services/category.service");

class CategoryController {
  getAll(req, res, next) {
    try {
      const categories = service.getAll();

      return res.json({
        success: true,
        data: categories,
      });
    } catch (error) {
      next(error);
    }
  }

  create(req, res, next) {
    try {
      const id = service.create(req.body.name);

      return res.status(201).json({
        success: true,
        message: "Create category successfully",
        id,
      });
    } catch (error) {
      next(error);
    }
  }

  update(req, res, next) {
    try {
      service.update(req.params.id, req.body.name);

      return res.json({
        success: true,
        message: "Update category successfully",
      });
    } catch (error) {
      next(error);
    }
  }

  delete(req, res, next) {
    try {
      service.delete(req.params.id);

      return res.json({
        success: true,
        message: "Delete category successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CategoryController();
