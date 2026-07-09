class Response {
  success(res, data = null, message = "Success") {
    return res.status(200).json({
      success: true,
      message,
      data,
    });
  }

  created(res, data = null, message = "Created successfully") {
    return res.status(201).json({
      success: true,
      message,
      data,
    });
  }

  deleted(res, message = "Deleted successfully") {
    return res.status(200).json({
      success: true,
      message,
    });
  }

  paginated(res, data, pagination) {
    return res.status(200).json({
      success: true,
      message: "Success",
      data,
      pagination,
    });
  }
}

module.exports = new Response();
