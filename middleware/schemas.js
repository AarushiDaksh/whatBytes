// src/middleware/schemas.js
const { z } = require("zod");

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

const patientCreateSchema = z.object({
  name: z.string().min(1),
  age: z.number().int().min(0),
  disease: z.string().optional().nullable()
});

const patientUpdateSchema = patientCreateSchema.partial();

const doctorCreateSchema = z.object({
  name: z.string().min(1),
  specialization: z.string().optional().nullable()
});

const doctorUpdateSchema = doctorCreateSchema.partial();

const mappingCreateSchema = z.object({
  doctorId: z.number().int().positive(),
  patientId: z.number().int().positive()
});


module.exports = {
  registerSchema,
  loginSchema,
  patientCreateSchema,
  patientUpdateSchema,
  doctorCreateSchema,
  doctorUpdateSchema,
  mappingCreateSchema,
};
