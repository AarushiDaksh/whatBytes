// src/routes/auth.js
const express = require("express");
const { validate } = require("../middleware/validate");
const { auth, requireRole } = require("../middleware/auth");
const { register, login} = require("../controllers/auth.controller");
const { registerSchema, loginSchema } = require("../middleware/schemas");
const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

  
module.exports = router;
