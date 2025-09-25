const  prisma  = require("../prisma");

async function createPatient(req, res) {
  const { name, age, disease } = req.body;
  try {
    const patient = await prisma.patient.create({
      data: { name, age, disease: disease ?? null },
    });
    return res.status(201).json({ status: "created", message: "Patient created successfully", data: patient });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

async function getPatients(_req, res) {
  try {
    const patients = await prisma.patient.findMany();
    return res.status(200).json({ status: "success", data: patients });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

async function getPatient(req, res) {
  const id = Number(req.params.id);
  try {
    const patient = await prisma.patient.findUnique({ where: { id } });
    if (!patient) return res.status(404).json({ status: "not_found", message: "Patient not found" });
    return res.status(200).json({ status: "success", data: patient });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

async function updatePatient(req, res) {
  const id = Number(req.params.id);
  const { name, age, disease } = req.body;
  try {
    const patient = await prisma.patient.update({
      where: { id },
      data: { name, age, disease },
    });
    return res.status(200).json({ status: "success", message: "Patient updated successfully", data: patient });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

async function deletePatient(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.patient.delete({ where: { id } });
    return res.status(200).json({ status: "success", message: "Patient deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

module.exports = { createPatient, getPatients, getPatient, updatePatient, deletePatient };
