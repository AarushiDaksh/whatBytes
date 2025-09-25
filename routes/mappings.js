const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const {
  assign,
  mappingIdParam,
  patientIdParam: mappingPatientIdParam,
} = require("../middleware/mapping.schemas");
const {
  assignDoctor,
  getMappings,
  getMappingForPatient,
  deleteDoctorFromPatientMappings,
} = require("../controllers/mapping.controller");

const router = express.Router();

router.post("/", auth, requireRole("admin"), validate(assign), assignDoctor);
router.get("/", auth, requireRole("admin"), getMappings);

// :id is a PATIENT ID here
router.get("/:id", auth, requireRole("admin"), validate(mappingPatientIdParam, "params"), getMappingForPatient);

// :id is a MAPPING ID here
router.delete("/:id", auth, requireRole("admin"), validate(mappingIdParam, "params"), deleteDoctorFromPatientMappings);

module.exports = router;
