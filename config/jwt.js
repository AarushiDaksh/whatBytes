const jwt = require("jsonwebtoken");

const JWT_SECRET   = process.env.JWT_SECRET   || "aarushi_daksh";
const JWT_ISSUER   = process.env.JWT_ISSUER   || "healthcare-node";
const JWT_AUDIENCE = process.env.JWT_AUDIENCE || "healthcare-clients";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

/**
 * Sign a JWT.
 * Always normalizes payload so `roles` is present as an array.
 * @param {Object} user - e.g. { id, name, email, roles }
 * @param {Object} [opts] - { expiresIn, issuer, audience }
 * @returns {string} token
 */
function generateToken(user, opts = {}) {
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    roles: Array.isArray(user.roles) ? user.roles : []
  };

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: opts.expiresIn || JWT_EXPIRES_IN,
    issuer:    opts.issuer    || JWT_ISSUER,
    audience:  opts.audience  || JWT_AUDIENCE,
  });
}

/**
 * Verify a JWT string -> returns decoded payload or throws.
 */
function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET, {
    issuer:   JWT_ISSUER,
    audience: JWT_AUDIENCE,
  });
}

/**
 * Extracts the Bearer token from an Authorization header.
 * @param {string} header e.g. "Bearer eyJhbGciOi..."
 * @returns {string|null}
 */
function getBearerToken(header = "") {
  if (!header || typeof header !== "string") return null;
  return header.startsWith("Bearer ") ? header.slice(7).trim() : null;
}

module.exports = {
  generateToken,
  verifyToken,
  getBearerToken,
  JWT_SECRET,
  JWT_ISSUER,
  JWT_AUDIENCE,
  JWT_EXPIRES_IN,
};
