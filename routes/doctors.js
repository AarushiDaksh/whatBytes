const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const {
  createDoctor: createDoctorSchema,
  updateDoctor: updateDoctorSchema,
  idParam: doctorIdParam,
} = require("../middleware/doctor.schemas");
const {
  createDoctor,
  getDoctors,
  getDoctor,
  updateDoctor,
  deleteDoctor,
} = require("../controllers/doctor.controller");

const router = express.Router();

// create needs admin
router.post("/", auth, requireRole("admin"), validate(createDoctorSchema), createDoctor);

// reads could be public or protected; keeping protected admin here for consistency:
router.get("/", auth, requireRole("admin"), getDoctors);
router.get("/:id", auth, requireRole("admin"), validate(doctorIdParam, "params"), getDoctor);

router.put("/:id",
  auth, requireRole("admin"),
  validate(doctorIdParam, "params"),
  validate(updateDoctorSchema),
  updateDoctor
);

router.delete("/:id",
  auth, requireRole("admin"),
  validate(doctorIdParam, "params"),
  deleteDoctor
);

module.exports = router;
