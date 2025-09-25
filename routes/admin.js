// routes/admin.routes.js
import { Router } from "express";
import { auth, requireRole } from "../middleware/auth.schemas";
import { validate } from "../middleware/validate.js";

// ---- controllers
import { setAdminRole } from "../controllers/auth.controller.js";

import {
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctors.controller.js";

import {
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from "../controllers/patients.controller.js";

import {
  getMappings,
  getMappingForPatient,              // expects :id to be a patientId
  deleteDoctorFromPatientMappings,   // expects :id to be a mappingId
} from "../controllers/mappings.controller.js";

// ---- schemas
import {
  setAdminParamsSchema,
  setAdminBodySchema,
} from "../middleware/schemas.js";

import {
  idParam as doctorIdParam,
  updateDoctor as updateDoctorSchema,
} from "../middleware/doctor.schemas.js";

import {
  idParam as patientIdParam,
  updatePatient as updatePatientSchema,
} from "../middleware/patient.schemas.js";

import {
  mappingIdParam,
  patientIdParam as mappingPatientIdParam,
} from "../middleware/mapping.schemas.js";

const router = Router();

// All routes below are admin-only (adjust if you want public GETs)
router.use(auth, requireRole("admin"));

// Authenticated route to set admin role
router.post(
  "/auth/roles/:id",
  validate(setAdminParamsSchema, "params"),
  validate(setAdminBodySchema, "body"),
  setAdminRole
);

// Admin routes for managing patients
router.get("/patients", getPatients);
router.get("/patients/:id", validate(patientIdParam, "params"), getPatient);
router.put(
  "/patients/:id",
  validate(patientIdParam, "params"),
  validate(updatePatientSchema),
  updatePatient
);
router.delete("/patients/:id", validate(patientIdParam, "params"), deletePatient);

// Admin routes for managing doctors
router.get("/doctors", getDoctors);
router.get("/doctors/:id", validate(doctorIdParam, "params"), getDoctor);
router.put(
  "/doctors/:id",
  validate(doctorIdParam, "params"),
  validate(updateDoctorSchema),
  updateDoctor
);
router.delete("/doctors/:id", validate(doctorIdParam, "params"), deleteDoctor);

// Admin routes for managing mappings
router.get("/mappings", getMappings);

// NOTE: your controller name `getMappingForPatient` implies :id is a PATIENT ID
router.get(
  "/mappings/:id",
  validate(mappingPatientIdParam, "params"),
  getMappingForPatient
);

// And your delete name implies :id is a MAPPING ID (the join row)
router.delete(
  "/mappings/:id",
  validate(mappingIdParam, "params"),
  deleteDoctorFromPatientMappings
);

export default router;
