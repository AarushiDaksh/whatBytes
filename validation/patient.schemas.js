const { z } = require("zod");

const createPatientSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().nonnegative(),
  disease: z.string().optional().nullable()
});

const idParam = z.object({ id: z.string().regex(/^\d+$/).transform(Number) });

const updatePatientSchema = z.object({
  name: z.string().min(1).optional(),
  age: z.number().int().nonnegative().optional(),
  disease: z.string().optional().nullable()
}).refine(
  (data) => Object.keys(data).length > 0,
  { message: "Provide at least one field to update" }
);

module.exports = { createPatientSchema, updatePatientSchema, idParam };
