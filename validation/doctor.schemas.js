const { z } = require("zod");

const createDoctorSchema = z.object({
  name: z.string().min(1),
  specialization: z.string().optional().nullable()
});

const idParam = z.object({ id: z.string().regex(/^\d+$/).transform(Number) });

const updateDoctorSchema = z.object({
  name: z.string().min(1).optional(),
  specialization: z.string().optional().nullable()
}).refine((d) => Object.keys(d).length > 0, { message: "Nothing to update" });

module.exports = { createDoctorSchema, updateDoctorSchema, idParam };
