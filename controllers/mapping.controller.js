const prisma = require("../prisma");

async function createMapping(req, res) {
  try {
    const m = await prisma.patientDoctor.create({
      data: { doctorId: req.body.doctorId, patientId: req.body.patientId }
    });
    return res.status(201).json({ status: "created", message: "Mapping created", data: m });
  } catch (e) {
    return res.status(500).json({ status: "unknown", message: `Error: ${e}` });
  }
}

async function listForPatient(req, res) {
  const patientId = Number(req.params.patientId);
  const data = await prisma.patientDoctor.findMany({
    where: { patientId },
    include: { doctor: true }
  });
  return res.json({ status: "success", message: "OK", data });
}

async function removeMapping(req, res) {
  const id = Number(req.params.id);
  const del = await prisma.patientDoctor.delete({ where: { id } });
  return res.json({ status: "deleted", message: "Deleted", data: del });
}

/* Admin */
async function adminListMappings(_req, res) {
  const data = await prisma.patientDoctor.findMany({ include: { doctor: true, patient: true } });
  return res.json({ status: "success", message: "All mappings", data });
}
async function adminGetMapping(req, res) {
  const id = Number(req.params.id);
  const data = await prisma.patientDoctor.findUnique({ where: { id }, include: { doctor: true, patient: true } });
  if (!data) return res.status(404).json({ status: "not_found", message: "Not found" });
  return res.json({ status: "success", message: "OK", data });
}
async function adminDeleteMapping(req, res) {
  const id = Number(req.params.id);
  const data = await prisma.patientDoctor.delete({ where: { id } });
  return res.json({ status: "deleted", message: "Deleted", data });
}

module.exports = { createMapping, listForPatient, removeMapping, adminListMappings, adminGetMapping, adminDeleteMapping };
