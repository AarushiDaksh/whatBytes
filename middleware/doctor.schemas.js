const { z } = require("zod");

const createDoctor = z.object({
  name: z.string().min(1),
  specialization: z.string().optional().nullable(),
});

const updateDoctor = z
  .object({
    name: z.string().min(1).optional(),
    specialization: z.string().optional().nullable(),
  })
  .refine((d) => Object.keys(d).length > 0, { message: "Nothing to update" });

const idParam = z.object({
  id: z.string().regex(/^\d+$/).transform(Number),
});

module.exports = { createDoctor, updateDoctor, idParam };
