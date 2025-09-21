const router = require("express").Router();
const prisma = require("../prisma");
const auth = require("../middleware/auth");
const { validate } = require("../middleware/validate");
const { createDoctorSchema, updateDoctorSchema, idParam } = require("../validation/doctor.schemas");

// create
router.post("/", auth, validate(createDoctorSchema), async (req, res, next) => {
  try {
    const doctor = await prisma.doctor.create({
      data: { ...req.body, createdBy: req.user.id }
    });
    res.status(201).json(doctor);
  } catch (e) { next(e); }
});

// list all
router.get("/", async (_req, res, next) => {
  try { res.json(await prisma.doctor.findMany()); } catch (e) { next(e); }
});

// get by id
router.get("/:id", validate({ params: idParam }), async (req, res, next) => {
  try {
    const doctor = await prisma.doctor.findUnique({ where: { id: req.params.id } });
    if (!doctor) return res.status(404).json({ message: "Not found" });
    res.json(doctor);
  } catch (e) { next(e); }
});

// update by id
router.put("/:id", auth, validate({ params: idParam, body: updateDoctorSchema }), async (req, res, next) => {
  try {
    const own = await prisma.doctor.findFirst({ where: { id: req.params.id, createdBy: req.user.id }});
    if (!own) return res.status(404).json({ message: "Not found or not owner" });

    const updated = await prisma.doctor.update({ where: { id: req.params.id }, data: req.body });
    res.json(updated);
  } catch (e) { next(e); }
});

// delete 
router.delete("/:id", auth, validate({ params: idParam }), async (req, res, next) => {
  try {
    const own = await prisma.doctor.findFirst({ where: { id: req.params.id, createdBy: req.user.id }});
    if (!own) return res.status(404).json({ message: "Not found or not owner" });
    await prisma.doctor.delete({ where: { id: req.params.id } });
    res.json({ message: "Deleted" });
  } catch (e) { next(e); }
});

module.exports = router;
