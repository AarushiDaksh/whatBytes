const bcrypt = require("bcryptjs");
const prisma = require("../prisma");
const { generateToken } = require("../config/jwt");

async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(409).json({ status: "conflict", message: "User with this email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashed, roles: [] },
      select: { id: true, name: true, email: true, roles: true }
    });

    const token = generateToken(newUser);
    return res.status(201).json({
      status: "created",
      message: "User created successfully",
      data: { token, user: newUser }
    });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `Something went wrong. Details: ${error}` });
  }
}

async function login(req, res) {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ status: "not_found", message: "User not found" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ status: "invalid", message: "Invalid credentials" });

    const token = generateToken(user);
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: { token, user: { id: user.id, name: user.name, email: user.email, roles: user.roles } }
    });
  } catch (error) {
    return res.status(500).json({ status: "unknown", message: `Something went wrong. Details: ${error}` });
  }
}



module.exports = { register, login };
