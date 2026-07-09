const repository = require("../repositories/category.repository");
const AppError = require("../utils/AppError");

class CategoryService {
  getAll() {
    return repository.findAll();
  }

  create(name) {
    const duplicate = repository.findByName(name);

    if (duplicate) {
      throw new AppError("Category already exists", 409);
    }

    return repository.create(name);
  }

  update(id, name) {
    const category = repository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    const duplicate = repository.findByName(name);

    if (duplicate && duplicate.id !== Number(id)) {
      throw new AppError("Category already exists", 409);
    }

    repository.update(id, name);
  }

  delete(id) {
    const category = repository.findById(id);

    if (!category) {
      throw new AppError("Category not found", 404);
    }

    repository.delete(id);
  }
}

module.exports = new CategoryService();
