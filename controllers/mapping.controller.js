const  prisma  = require("../prisma");

// POST /api/mappings (assign doctor to patient)
async function assignDoctor(req, res) {
  const { patientId, doctorId } = req.body; // numbers
  try {
    const patient = await prisma.patient.findUnique({ where: { id: Number(patientId) } });
    const doctor  = await prisma.doctor.findUnique({ where: { id: Number(doctorId) } });
    if (!patient || !doctor) {
      return res.status(404).json({ status: "not_found", message: "Doctor or Patient not found" });
    }

    const mapping = await prisma.mapping.create({
      data: { patientId: Number(patientId), doctorId: Number(doctorId) },
    });

    return res.status(201).json({ status: "created", message: "Doctor assigned to patient successfully", data: mapping });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

// GET /api/mappings
async function getMappings(_req, res) {
  try {
    const mappings = await prisma.mapping.findMany({ include: { patient: true, doctor: true } });
    return res.status(200).json({ status: "success", data: mappings });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

// GET /api/mappings/:id (by patient id)
async function getMappingForPatient(req, res) {
  const patientId = Number(req.params.id);
  try {
    const mappings = await prisma.mapping.findMany({
      where: { patientId },
      include: { doctor: true },
    });
    return res.status(200).json({ status: "success", data: mappings });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

// DELETE /api/mappings/:id (mapping row id)
async function deleteDoctorFromPatientMappings(req, res) {
  const id = Number(req.params.id);
  try {
    await prisma.mapping.delete({ where: { id } });
    return res.status(200).json({ status: "success", message: "Mapping deleted successfully" });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `${error}` });
  }
}

module.exports = {
  assignDoctor,
  getMappings,
  getMappingForPatient,
  deleteDoctorFromPatientMappings,
};
