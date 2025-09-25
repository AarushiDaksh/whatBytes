// Basic centralized error handler (keeps JSON shape consistent)
function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    status: status === 500 ? "unknown" : "error",
    message,
    ...(err.errors ? { errors: err.errors } : {}),
  });
}
module.exports = { errorHandler };
