const bcrypt = require("bcryptjs");
const  prisma  = require("../prisma");
const { generateToken } = require("../config/jwt");

// POST /api/auth/register
async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return res.status(409).json({ status: "conflict", message: "User with this email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashed, roles: [] },
      select: { id: true, name: true, email: true, roles: true },
    });

    const token = generateToken(newUser);

    return res.status(201).json({
      status: "created",
      message: "User created successfully",
      data: {
        token,
        user: newUser // includes roles
      }
    });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `Something went wrong. Details: ${error}` });
  }
}

// POST /api/auth/login
async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ status: "not_found", message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      // don't leak roles on invalid password
      return res.status(401).json({ status: "invalid", message: "Invalid credentials" });
    }

    const token = generateToken(user);

    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        token,
        user: { id: user.id, name: user.name, email: user.email, roles: user.roles }
      }
    });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `Something went wrong. Details: ${error}` });
  }
}

// POST /api/auth/roles/:id
async function setAdminRole(req, res) {
  const id = Number(req.params.id);
  const action = req.body?.action ?? "grant";

  try {
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return res.status(404).json({ status: "not_found", message: "User not found" });

    const current = Array.isArray(user.roles) ? user.roles : [];
    const hasAdmin = current.includes("admin");

    if (action === "grant") {
      if (hasAdmin) return res.status(409).json({ status: "conflict", message: "User is already an admin" });
      const updated = await prisma.user.update({
        where: { id },
        data: { roles: [...new Set([...current, "admin"])] },
        select: { id: true, name: true, email: true, roles: true },
      });
      return res.status(200).json({ status: "success", message: "Admin role granted", data: updated });
    } else {
      if (!hasAdmin) return res.status(409).json({ status: "conflict", message: "User is not an admin" });
      const updated = await prisma.user.update({
        where: { id },
        data: { roles: current.filter((r) => r !== "admin") },
        select: { id: true, name: true, email: true, roles: true },
      });
      return res.status(200).json({ status: "success", message: "Admin role revoked", data: updated });
    }
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `Something went wrong. Details: ${error}` });
  }
}

module.exports = { register, login, setAdminRole };
