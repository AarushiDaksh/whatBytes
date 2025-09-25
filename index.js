require("dotenv").config();
const express = require("express");

const authRoutes = require("./routes/auth");
const patientRoutes = require("./routes/patients");
const doctorRoutes = require("./routes/doctors");
const mappingRoutes = require("./routes/mappings");

const app = express();
app.use(express.json());

app.get("/", (_req, res) => res.json({ status: "success", message: "Healthcare API running" }));

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/mappings", mappingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
