// src/routes/doctors.js
const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const {
  createDoctor, getMyDoctor, updateMyDoctor, deleteMyDoctor,

} = require("../controllers/doctor.controller");
const { doctorCreateSchema, doctorUpdateSchema } = require("../middleware/schemas");

const router = express.Router();
router.post("/", auth, validate(doctorCreateSchema), createDoctor);
router.get("/:id", auth, getMyDoctor);
router.put("/:id", auth, validate(doctorUpdateSchema), updateMyDoctor);
router.delete("/:id", auth, deleteMyDoctor);


module.exports = router;
