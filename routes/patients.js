const router = require("express").Router();
const prisma = require("../prisma");
const auth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { createPatientSchema, updatePatientSchema, idParam } = require("../validation/patient.schemas");

// create
router.post("/", auth, validate(createPatientSchema), async (req, res, next) => {
  try {
    const patient = await prisma.patient.create({
      data: { ...req.body, createdBy: req.user.id }
    });
    res.status(201).json(patient);
  } catch (e) { next(e); }
});

// list
router.get("/", auth, async (req, res, next) => {
  try {
    const patients = await prisma.patient.findMany({ where: { createdBy: req.user.id } });
    res.json(patients);
  } catch (e) { next(e); }
});

// get by id
router.get("/:id", auth, validate({ params: idParam }), async (req, res, next) => {
  try {
    const patient = await prisma.patient.findFirst({
      where: { id: req.params.id, createdBy: req.user.id }
    });
    if (!patient) return res.status(404).json({ message: "Not found" });
    res.json(patient);
  } catch (e) { next(e); }
});

// update
router.put("/:id", auth, validate({ params: idParam, body: updatePatientSchema }), async (req, res, next) => {
  try {
    const own = await prisma.patient.findFirst({ where: { id: req.params.id, createdBy: req.user.id }});
    if (!own) return res.status(404).json({ message: "Not found" });

    const updated = await prisma.patient.update({
      where: { id: req.params.id },
      data: req.body
    });
    res.json(updated);
  } catch (e) { next(e); }
});

// delete
router.delete("/:id", auth, validate({ params: idParam }), async (req, res, next) => {
  try {
    const own = await prisma.patient.findFirst({ where: { id: req.params.id, createdBy: req.user.id }});
    if (!own) return res.status(404).json({ message: "Not found" });
    await prisma.patient.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (e) { next(e); }
});

module.exports = router;
