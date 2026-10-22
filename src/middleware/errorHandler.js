
export function errorHandler(err, req, res, next) {
  // Mongoose validation errors
  if (err.name === "ValidationError") {
    const fields = {};

    for (const key in err.errors) {
      fields[key] = err.errors[key].message;
    }

    return res.status(400).json({
      error: "ValidationError",
      fields,
    });
  }

  // Invalid MongoDB ID
  if (err.name === "CastError") {
    return res.status(400).json({
      error: "CastError",
      message: "Invalid ID format",
      field: err.path,
    });
  }

  // Duplicate unique field, such as slug
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "unknown";

    return res.status(409).json({
      error: "DuplicateKey",
      message: `${field} already exists`,
      field,
    });
  }

  // Unexpected errors
  // Unexpected errors
  console.error(err);

  return res.status(500).json({
    error: "InternalServerError",
  });
}
