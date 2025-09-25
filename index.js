require("dotenv").config();
const express = require("express");
const cors = require("cors");

// routes
const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");
const mappingRoutes = require("./routes/mappings");

// error middleware
const { errorHandler } = require("./middleware/error");

const app = express();

// core middleware
app.use(cors());
app.use(express.json());

// health
app.get("/", (_req, res) =>
  res.json({ ok: true, service: "healthcare-node", env: process.env.NODE_ENV || "dev" })
);

// mount routers
app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mappings", mappingRoutes);

<<<<<<< HEAD
// 404 fallback
app.use((req, res) => {
  res.status(404).json({ status: "not_found", message: `Route ${req.method} ${req.originalUrl} not found` });
});

// centralized error handler
=======
>>>>>>> 42504b041ac59f58f204c2735f1c7e4e68e9aa9c
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
