// Crée un compte admin, ou change son mot de passe s'il existe déjà.
// Usage : npm run create-admin -- admin@exemple.com MotDePasse

const bcrypt = require("bcryptjs");

const {
  readJson,
  writeJson,
} = require("../utils/jsonDb");

const [email, password] = process.argv.slice(2);

if (!email || !password) {
  console.error(
    "Usage : npm run create-admin -- <email> <mot de passe>"
  );
  process.exit(1);
}

if (password.length < 8) {
  console.error(
    "Le mot de passe doit contenir au moins 8 caractères."
  );
  process.exit(1);
}

let admins = [];

try {
  admins = readJson("admins.json");
} catch {
  // Premier admin : le fichier n'existe pas encore.
}

const normalizedEmail = email.trim().toLowerCase();

// Seul le hash est stocké, jamais le mot de passe en clair.
const passwordHash = bcrypt.hashSync(password, 10);

const existingAdmin = admins.find(
  (admin) => admin.email === normalizedEmail
);

if (existingAdmin) {
  existingAdmin.passwordHash = passwordHash;
} else {
  admins.push({
    id:
      admins.length > 0
        ? Math.max(...admins.map((admin) => admin.id)) + 1
        : 1,
    email: normalizedEmail,
    passwordHash,
    createdAt: new Date().toISOString(),
  });
}

writeJson("admins.json", admins);

console.log(
  existingAdmin
    ? `Mot de passe mis à jour pour ${normalizedEmail}.`
    : `Admin ${normalizedEmail} créé.`
);
