const router = require("express").Router();
const prisma = require("../prisma");
const auth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { assignSchema, mappingIdParam, patientIdParam } = require("../validation/mapping.schemas");

// assign
router.post("/", auth, validate(assignSchema), async (req, res, next) => {
  try {
    const { patientId, doctorId } = req.body;

    const patient = await prisma.patient.findFirst({
      where: { id: patientId, createdBy: req.user.id }
    });
    if (!patient) return res.status(404).json({ message: "Patient not found or not yours" });

    const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const mapping = await prisma.patientDoctor.create({ data: { patientId, doctorId } });
    res.status(201).json(mapping);
  } catch (e) { next(e); }
});

// list all
router.get("/", async (_req, res, next) => {
  try {
    const list = await prisma.patientDoctor.findMany({ include: { patient: true, doctor: true } });
    res.json(list);
  } catch (e) { next(e); }
});

// doctors for a patient
router.get("/:patientId", validate({ params: patientIdParam }), async (req, res, next) => {
  try {
    const list = await prisma.patientDoctor.findMany({
      where: { patientId: req.params.patientId },
      include: { doctor: true }
    });
    res.json(list.map((m) => m.doctor));
  } catch (e) { next(e); }
});

// delete mapping by id
router.delete("/:id", auth, validate({ params: mappingIdParam }), async (req, res, next) => {
  try {
    await prisma.patientDoctor.delete({ where: { id: req.params.id } });
    res.json({ message: "Mapping removed" });
  } catch (e) { next(e); }
});

module.exports = router;
