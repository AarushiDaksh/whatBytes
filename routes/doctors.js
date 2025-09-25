// src/routes/doctors.js
const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const {
  createDoctor, getMyDoctor, updateMyDoctor, deleteMyDoctor,
  adminListDoctors, adminGetDoctor, adminUpdateDoctor, adminDeleteDoctor
} = require("../controllers/doctor.controller");
const { doctorCreateSchema, doctorUpdateSchema } = require("../middleware/schemas");

const router = express.Router();
router.post("/", auth, validate(doctorCreateSchema), createDoctor);
router.get("/:id", auth, getMyDoctor);
router.put("/:id", auth, validate(doctorUpdateSchema), updateMyDoctor);
router.delete("/:id", auth, deleteMyDoctor);

/* Admin */
router.get("/admin/all", auth, requireRole("admin"), adminListDoctors);
router.get("/admin/:id", auth, requireRole("admin"), adminGetDoctor);
router.put("/admin/:id", auth, requireRole("admin"), validate(doctorUpdateSchema), adminUpdateDoctor);
router.delete("/admin/:id", auth, requireRole("admin"), adminDeleteDoctor);

module.exports = router;
