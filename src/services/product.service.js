const repository = require("../repositories/product.repository");
const AppError = require("../utils/AppError");
const { getPagination, createPagination } = require("../utils/pagination");

class ProductService {
  getAll(queryParams) {
    const { page, limit, offset } = getPagination(queryParams);

    const products = repository.findAll({
      search: queryParams.search,

      category_id: queryParams.category_id,

      limit,

      offset,
    });

    const total = repository.count({
      search: queryParams.search,

      category_id: queryParams.category_id,
    });

    return {
      products,

      pagination: createPagination(page, limit, total),
    };
  }

  getList(queryParams) {
    const { page, limit, offset } = getPagination(queryParams);

    const products = repository.findList({
      search: queryParams.search,
      category_id: queryParams.category_id,
      limit,
      offset,
    });

    const total = repository.count({
      search: queryParams.search,
      category_id: queryParams.category_id,
    });

    return {
      products,
      pagination: createPagination(page, limit, total),
    };
  }

  create(product) {
    const duplicate = repository.findByBarcode(product.barcode);

    if (duplicate) {
      throw new AppError("Barcode already exists", 409);
    }

    return repository.create(product);
  }

  getById(id) {
    const product = repository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  getByBarcode(barcode) {
    const product = repository.findByBarcode(barcode);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  update(id, data) {
    const product = repository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    const duplicate = repository.findByBarcode(data.barcode);

    if (duplicate && duplicate.id !== Number(id)) {
      throw new AppError("Barcode already exists", 409);
    }

    repository.update(id, data);
  }

  delete(id) {
    const product = repository.findById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    repository.delete(id);
  }
}

module.exports = new ProductService();
