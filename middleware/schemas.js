const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "name is required").max(80),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password must be at least 6 chars"),
});

const loginSchema = z.object({
  email: z.string().email("invalid email"),
  password: z.string().min(1, "password required"),
});

const setAdminParamsSchema = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

const setAdminBodySchema = z
  .object({ action: z.enum(["grant", "revoke"]).optional() })
  .optional();

module.exports = {
  registerSchema,
  loginSchema,
  setAdminParamsSchema,
  setAdminBodySchema,
};
