// middleware/auth.js
const { verifyToken, getBearerToken } = require("../config/jwt");

// Super safe auth: sets req.user or returns 401, never throws
const auth = (req, res, next) => {
  try {
    const token = getBearerToken(req.headers.authorization);
    if (!token) {
      // No token at all
      return res.status(401).json({ status: "unauthorized", message: "Missing Bearer token" });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (e) {
      return res.status(401).json({ status: "unauthorized", message: "Invalid or expired token" });
    }

    // normalize shape
    req.user = {
      id: decoded && decoded.id != null ? decoded.id : null,
      name: decoded && decoded.name != null ? decoded.name : null,
      email: decoded && decoded.email != null ? decoded.email : null,
      roles: Array.isArray(decoded && decoded.roles) ? decoded.roles : [],
    };

    return next();
  } catch (e) {
    // last resort (shouldn’t happen)
    return res.status(401).json({ status: "unauthorized", message: "Auth middleware failure" });
  }
};

// Role guard that never throws and explains what’s wrong
const requireRole = (...allowed) => {
  return (req, res, next) => {
    if (!req || !req.user) {
      return res
        .status(401)
        .json({ status: "unauthorized", message: "No authenticated user (did you include auth middleware?)" });
    }

    const roles = Array.isArray(req.user.roles) ? req.user.roles : [];
    const ok = roles.some((r) => allowed.includes(r));

    if (!ok) {
      return res
        .status(403)
        .json({ status: "forbidden", message: `Insufficient permissions. Need one of: ${allowed.join(", ")}` });
    }

    return next();
  };
};

module.exports = { auth, requireRole };
