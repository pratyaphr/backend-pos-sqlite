function getPagination(query) {
  const page = Math.max(Number(query.page) || 1, 1);

  const limit = Math.max(Number(query.limit) || 20, 1);

  const offset = (page - 1) * limit;

  return {
    page,
    limit,
    offset,
  };
}

function createPagination(page, limit, total) {
  return {
    page,

    limit,

    total,

    totalPages: Math.ceil(total / limit),
  };
}

module.exports = {
  getPagination,

  createPagination,
};
