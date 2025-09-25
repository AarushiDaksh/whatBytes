// src/middleware/validate.js
const { ZodError } = require("zod");

const validate =
  (schema, where = "body") =>
  (req, res, next) => {
    try {
      if (!schema) return next();
      req[where] = schema.parse(req[where]);
      return next();
    } catch (e) {
      if (e instanceof ZodError) {
        return res.status(400).json({ status: "invalid", message: "Validation failed", data: e.flatten() });
      }
      return res.status(400).json({ status: "invalid", message: "Invalid payload" });
    }
  };

module.exports = { validate };
