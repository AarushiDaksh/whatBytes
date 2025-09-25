// src/routes/patients.js
const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const {
  createPatient, getMyPatient, updateMyPatient, deleteMyPatient,
  
} = require("../controllers/patient.controller");
const { patientCreateSchema, patientUpdateSchema } = require("../middleware/schemas");

const router = express.Router();
router.post("/", auth, validate(patientCreateSchema), createPatient);
router.get("/:id", auth, getMyPatient);
router.put("/:id", auth, validate(patientUpdateSchema), updateMyPatient);
router.delete("/:id", auth, deleteMyPatient);


module.exports = router;
