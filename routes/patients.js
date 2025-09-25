const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const {
  createPatient: createPatientSchema,
  updatePatient: updatePatientSchema,
  idParam: patientIdParam,
} = require("../middleware/patient.schemas");
const {
  createPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} = require("../controllers/patient.controller");

const router = express.Router();

router.post("/", auth, requireRole("admin"), validate(createPatientSchema), createPatient);
router.get("/", auth, requireRole("admin"), getPatients);
router.get("/:id", auth, requireRole("admin"), validate(patientIdParam, "params"), getPatient);
router.put("/:id",
  auth, requireRole("admin"),
  validate(patientIdParam, "params"),
  validate(updatePatientSchema),
  updatePatient
);
router.delete("/:id",
  auth, requireRole("admin"),
  validate(patientIdParam, "params"),
  deletePatient
);

module.exports = router;
