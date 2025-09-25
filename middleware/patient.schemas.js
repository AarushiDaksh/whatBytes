const { z } = require("zod");

const createPatient = z.object({
  name: z.string().min(1, "Patient name is required"),
  age: z.number().int().nonnegative("Age must be a positive integer"),
  disease: z.string().optional().nullable(),
});

const updatePatient = z
  .object({
    name: z.string().min(1).optional(),
    age: z.number().int().nonnegative().optional(),
    disease: z.string().optional().nullable(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one field to update",
  });

const idParam = z.object({
  id: z.string().uuid("Invalid patient id"),
});

module.exports = { createPatient, updatePatient, idParam };
