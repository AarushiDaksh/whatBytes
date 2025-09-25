// src/routes/patients.js
const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const {
  createPatient, getMyPatient, updateMyPatient, deleteMyPatient,
  adminListPatients, adminGetPatient, adminUpdatePatient, adminDeletePatient
} = require("../controllers/patient.controller");
const { patientCreateSchema, patientUpdateSchema } = require("../middleware/schemas");

const router = express.Router();
router.post("/", auth, validate(patientCreateSchema), createPatient);
router.get("/:id", auth, getMyPatient);
router.put("/:id", auth, validate(patientUpdateSchema), updateMyPatient);
router.delete("/:id", auth, deleteMyPatient);

/* Admin list routes */
router.get("/admin/all", auth, requireRole("admin"), adminListPatients);
router.get("/admin/:id", auth, requireRole("admin"), adminGetPatient);
router.put("/admin/:id", auth, requireRole("admin"), validate(patientUpdateSchema), adminUpdatePatient);
router.delete("/admin/:id", auth, requireRole("admin"), adminDeletePatient);

module.exports = router;
