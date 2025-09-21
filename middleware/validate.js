const validate =
  (schema) =>
  async (req, _res, next) => {
    try {
     
      if (schema?.body) req.body = await schema.body.parseAsync(req.body);
      if (schema?.params) req.params = await schema.params.parseAsync(req.params);
      if (schema?.query) req.query = await schema.query.parseAsync(req.query);
      if (!schema?.body && !schema?.params && !schema?.query) {
        req.body = await schema.parseAsync(req.body);
      }
      next();
    } catch (err) {
      next(err);
    }
  };

module.exports = { validate };
