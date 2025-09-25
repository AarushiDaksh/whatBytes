// src/routes/mappings.js
const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const { mappingCreateSchema } = require("../middleware/schemas");
const {
  createMapping, listForPatient, removeMapping,
  adminListMappings, adminGetMapping, adminDeleteMapping
} = require("../controllers/mapping.controller");

const router = express.Router();
router.post("/", auth, validate(mappingCreateSchema), createMapping);
router.get("/:patientId", auth, listForPatient);
router.delete("/:id", auth, removeMapping);

/* Admin */
router.get("/admin/all", auth, requireRole("admin"), adminListMappings);
router.get("/admin/:id", auth, requireRole("admin"), adminGetMapping);
router.delete("/admin/:id", auth, requireRole("admin"), adminDeleteMapping);

module.exports = router;
