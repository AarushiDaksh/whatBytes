const { verifyToken, getBearerToken } = require("../config/jwt");

const auth = (req, res, next) => {
  const token = getBearerToken(req.headers.authorization);
  if (!token) return res.status(401).json({ status: "unauthorized", message: "Missing Bearer token" });

  try {
    const decoded = verifyToken(token);
    req.user = {
      id: decoded.id ?? null,
      name: decoded.name ?? null,
      email: decoded.email ?? null,
      roles: Array.isArray(decoded.roles) ? decoded.roles : []
    };
    next();
  } catch {
    return res.status(401).json({ status: "unauthorized", message: "Invalid or expired token" });
  }
};

const requireRole = (...allowed) => (req, res, next) => {
  const roles = Array.isArray(req.user?.roles) ? req.user.roles : [];
  if (!roles.some(r => allowed.includes(r))) {
    return res.status(403).json({ status: "forbidden", message: `Insufficient permissions. Need one of: ${allowed.join(", ")}` });
  }
  next();
};

module.exports = { auth, requireRole };
