const { z } = require("zod");

const assignSchema = z.object({
  patientId: z.number().int().positive(),
  doctorId: z.number().int().positive()
});

const mappingIdParam = z.object({
  id: z.string().regex(/^\d+$/).transform(Number)
});

const patientIdParam = z.object({
  patientId: z.string().regex(/^\d+$/).transform(Number)
});

module.exports = { assignSchema, mappingIdParam, patientIdParam };
