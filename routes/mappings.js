// src/routes/mappings.js
const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const { mappingCreateSchema } = require("../middleware/schemas");
const {
  createMapping, listForPatient, removeMapping,

} = require("../controllers/mapping.controller");

const router = express.Router();
router.post("/", auth, validate(mappingCreateSchema), createMapping);
router.get("/:patientId", auth, listForPatient);
router.delete("/:id", auth, removeMapping);


module.exports = router;
