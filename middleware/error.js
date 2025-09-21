function errorHandler(err, req, res, _next) {
  // Zod validation errors
  if (err?.name === "ZodError") {
    return res.status(400).json({
      message: "Validation failed",
      errors: err.issues?.map(i => ({
        path: i.path.join("."),
        message: i.message
      }))
    });
  }

  // Prisma known client errors
  if (err?.code && err?.clientVersion) {
    // Prisma codes:
    // P2002: Unique constraint failed
    // P2003: Foreign key constraint failed
    // P2025: Record not found
    const map = {
      P2002: { status: 409, message: "Unique constraint failed" },
      P2003: { status: 400, message: "Invalid relation / FK constraint failed" },
      P2025: { status: 404, message: "Record not found" }
    };
    const m = map[err.code] || { status: 500, message: "Database error" };
    return res.status(m.status).json({ message: m.message, code: err.code });
  }

  // JWT errors 
  if (err?.name === "JsonWebTokenError" || err?.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  // Fallback
  console.error(err);
  res.status(500).json({ message: "Server error" });
}

module.exports = { errorHandler };
