const prisma = require("../prisma");

async function createPatient(req, res) {
  try {
    const patient = await prisma.patient.create({
      data: {
        name: req.body.name,
        age: req.body.age,
        disease: req.body.disease ?? null,
        createdById: req.user.id
      }
    });
    return res.status(201).json({ status: "created", message: "Patient created", data: patient });
  } catch (e) {
    return res.status(500).json({ status: "unknown", message: `Error: ${e}` });
  }
}

async function getMyPatient(req, res) {
  const id = Number(req.params.id);
  try {
    const patient = await prisma.patient.findFirst({
      where: { id, OR: [{ createdById: req.user.id }, { createdById: null }] }
    });
    if (!patient) return res.status(404).json({ status: "not_found", message: "Not found" });
    return res.json({ status: "success", message: "OK", data: patient });
  } catch (e) {
    return res.status(500).json({ status: "unknown", message: `Error: ${e}` });
  }
}

async function updateMyPatient(req, res) {
  const id = Number(req.params.id);
  try {
    const owned = await prisma.patient.findFirst({ where: { id, createdById: req.user.id } });
    if (!owned) return res.status(404).json({ status: "not_found", message: "Not found or not yours" });

    const updated = await prisma.patient.update({
      where: { id },
      data: { name: req.body.name, age: req.body.age, disease: req.body.disease ?? null }
    });
    return res.json({ status: "updated", message: "Patient updated", data: updated });
  } catch (e) {
    return res.status(500).json({ status: "unknown", message: `Error: ${e}` });
  }
}

async function deleteMyPatient(req, res) {
  const id = Number(req.params.id);
  try {
    const owned = await prisma.patient.findFirst({ where: { id, createdById: req.user.id } });
    if (!owned) return res.status(404).json({ status: "not_found", message: "Not found or not yours" });
    const del = await prisma.patient.delete({ where: { id } });
    return res.json({ status: "deleted", message: "Patient deleted", data: del });
  } catch (e) {
    return res.status(500).json({ status: "unknown", message: `Error: ${e}` });
  }
}

/* Admin list / admin item ops */
async function adminListPatients(_req, res) {
  const data = await prisma.patient.findMany();
  return res.json({ status: "success", message: "All patients", data });
}
async function adminGetPatient(req, res) {
  const id = Number(req.params.id);
  const data = await prisma.patient.findUnique({ where: { id } });
  if (!data) return res.status(404).json({ status: "not_found", message: "Not found" });
  return res.json({ status: "success", message: "OK", data });
}
async function adminUpdatePatient(req, res) {
  const id = Number(req.params.id);
  const data = await prisma.patient.update({
    where: { id },
    data: { name: req.body.name, age: req.body.age, disease: req.body.disease ?? null }
  });
  return res.json({ status: "updated", message: "Updated", data });
}
async function adminDeletePatient(req, res) {
  const id = Number(req.params.id);
  const data = await prisma.patient.delete({ where: { id } });
  return res.json({ status: "deleted", message: "Deleted", data });
}

module.exports = {
  createPatient, getMyPatient, updateMyPatient, deleteMyPatient,
  adminListPatients, adminGetPatient, adminUpdatePatient, adminDeletePatient
};
