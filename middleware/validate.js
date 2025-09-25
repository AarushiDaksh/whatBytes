const validate =
  (schema, which = "body") =>
  (req, res, next) => {
    if (!schema) return next();
    const parsed = schema.safeParse(req[which]);
    if (!parsed.success) {
      return res.status(422).json({
        status: "validation_error",
        message: "Invalid input",
        errors: parsed.error.format(),
      });
    }
    req[which] = parsed.data;
    next();
  };

module.exports = { validate };
