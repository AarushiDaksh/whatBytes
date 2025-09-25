const  prisma  = require("../prisma");

// POST /api/doctors
async function createDoctor(req, res) {
  const { name, specialization } = req.body;
  try {
    const doctor = await prisma.doctor.create({
      data: { name, specialization: specialization ?? null },
    });
    return res.status(201).json({ status: "created", message: "Doctor created successfully", data: doctor });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

// GET /api/doctors
async function getDoctors(_req, res) {
  try {
    const doctors = await prisma.doctor.findMany();
    return res.status(200).json({ status: "success", data: doctors });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

// GET /api/doctors/:id
async function getDoctor(req, res) {
  const id = Number(req.params.id);
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id } });
    if (!doctor) return res.status(404).json({ status: "not_found", message: "Doctor not found" });
    return res.status(200).json({ status: "success", data: doctor });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

// PUT /api/doctors/:id
async function updateDoctor(req, res) {
  const id = Number(req.params.id);
  const { name, specialization } = req.body;
  try {
    const doctor = await prisma.doctor.update({
      where: { id },
      data: { name, specialization },
    });
    return res.status(200).json({ status: "success", message: "Doctor updated successfully", data: doctor });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

// DELETE /api/doctors/:id
async function deleteDoctor(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.doctor.delete({ where: { id } });
    return res.status(200).json({ status: "success", message: "Doctor deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

module.exports = { createDoctor, getDoctors, getDoctor, updateDoctor, deleteDoctor };
