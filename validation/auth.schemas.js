const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1, "name is required").max(80),
  email: z.string().email("invalid email"),
  password: z.string().min(6, "password must be at least 6 chars")
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "password required")
});

module.exports = { registerSchema, loginSchema };
