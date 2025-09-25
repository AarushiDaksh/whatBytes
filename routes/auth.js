// src/routes/auth.js
const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const { register, login, setAdminRole } = require("../controllers/auth.controller");
const { registerSchema, loginSchema, setAdminParamsSchema, setAdminBodySchema } = require("../middleware/schemas");
const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/admin/roles/:id",
  auth,
  requireRole("admin"),
  validate(setAdminParamsSchema, "params"),
  validate(setAdminBodySchema, "body"),
  setAdminRole
);

module.exports = router;
