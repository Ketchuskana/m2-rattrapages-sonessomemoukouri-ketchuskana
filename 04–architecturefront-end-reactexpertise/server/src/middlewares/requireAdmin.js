const jwt = require("jsonwebtoken");

// Vérifie le jeton envoyé dans l'en-tête
// "Authorization: Bearer <token>".
function requireAdmin(req, res, next) {
  const header = req.headers.authorization ?? "";

  const [scheme, token] = header.split(" ");

  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({
      message: "Authentification requise.",
    });
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.admin = {
      id: payload.sub,
      email: payload.email,
    };

    return next();
  } catch {
    return res.status(401).json({
      message: "Session expirée, veuillez vous reconnecter.",
    });
  }
}

module.exports = {
  requireAdmin,
};
