const prisma = require("../prisma");

async function createDoctor(req, res) {
  try {
    const doc = await prisma.doctor.create({
      data: { name: req.body.name, specialization: req.body.specialization ?? null, createdById: req.user.id }
    });
    return res.status(201).json({ status: "created", message: "Doctor created", data: doc });
  } catch (e) {
    return res.status(500).json({ status: "unknown", message: `Error: ${e}` });
  }
}

async function getMyDoctor(req, res) {
  const id = Number(req.params.id);
  const doc = await prisma.doctor.findFirst({ where: { id, OR: [{ createdById: req.user.id }, { createdById: null }] } });
  if (!doc) return res.status(404).json({ status: "not_found", message: "Not found" });
  return res.json({ status: "success", message: "OK", data: doc });
}

async function updateMyDoctor(req, res) {
  const id = Number(req.params.id);
  const owned = await prisma.doctor.findFirst({ where: { id, createdById: req.user.id } });
  if (!owned) return res.status(404).json({ status: "not_found", message: "Not found or not yours" });
  const updated = await prisma.doctor.update({
    where: { id },
    data: { name: req.body.name, specialization: req.body.specialization ?? null }
  });
  return res.json({ status: "updated", message: "Doctor updated", data: updated });
}

async function deleteMyDoctor(req, res) {
  const id = Number(req.params.id);
  const owned = await prisma.doctor.findFirst({ where: { id, createdById: req.user.id } });
  if (!owned) return res.status(404).json({ status: "not_found", message: "Not found or not yours" });
  const del = await prisma.doctor.delete({ where: { id } });
  return res.json({ status: "deleted", message: "Doctor deleted", data: del });
}

/* Admin */
async function adminListDoctors(_req, res) {
  const data = await prisma.doctor.findMany();
  return res.json({ status: "success", message: "All doctors", data });
}
async function adminGetDoctor(req, res) {
  const id = Number(req.params.id);
  const data = await prisma.doctor.findUnique({ where: { id } });
  if (!data) return res.status(404).json({ status: "not_found", message: "Not found" });
  return res.json({ status: "success", message: "OK", data });
}
async function adminUpdateDoctor(req, res) {
  const id = Number(req.params.id);
  const data = await prisma.doctor.update({
    where: { id },
    data: { name: req.body.name, specialization: req.body.specialization ?? null }
  });
  return res.json({ status: "updated", message: "Updated", data });
}
async function adminDeleteDoctor(req, res) {
  const id = Number(req.params.id);
  const data = await prisma.doctor.delete({ where: { id } });
  return res.json({ status: "deleted", message: "Deleted", data });
}

module.exports = {
  createDoctor, getMyDoctor, updateMyDoctor, deleteMyDoctor,
  adminListDoctors, adminGetDoctor, adminUpdateDoctor, adminDeleteDoctor
};
