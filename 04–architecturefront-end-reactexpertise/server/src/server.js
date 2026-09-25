require("dotenv").config();

const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {
  readJson,
  writeJson,
} = require("./utils/jsonDb");

const {
  sendBookingEmails,
} = require("./services/emailService");

const {
  requireAdmin,
} = require("./middlewares/requireAdmin");

if (!process.env.JWT_SECRET) {
  console.error(
    "JWT_SECRET manquant dans server/.env : impossible de sécuriser l'administration."
  );
  process.exit(1);
}

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body ?? {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email et mot de passe requis.",
      });
    }

    let admins = [];

    try {
      admins = readJson("admins.json");
    } catch {
      // Aucun admin créé pour l'instant.
    }

    const admin = admins.find(
      (admin) =>
        admin.email === email.trim().toLowerCase()
    );

    const isValid =
      admin &&
      (await bcrypt.compare(
        password,
        admin.passwordHash
      ));

    // Même message dans les deux cas pour ne pas révéler
    // quels emails existent.
    if (!isValid) {
      return res.status(401).json({
        message: "Email ou mot de passe incorrect.",
      });
    }

    const token = jwt.sign(
      { sub: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.json({
      token,
      admin: {
        id: admin.id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Erreur connexion admin :", error);

    return res.status(500).json({
      message: "Impossible de se connecter.",
    });
  }
});

app.get("/api/services", (req, res) => {
  try {
    const services = readJson("services.json");

    return res.json(services);
  } catch (error) {
    console.error(
      "Erreur chargement services :",
      error
    );

    return res.status(500).json({
      message: "Impossible de charger les prestations.",
    });
  }
});

app.get("/api/slots", (req, res) => {
  try {
    const { date } = req.query;

    const bookings = readJson("bookings.json");

    const allSlots = [
      "09:00",
      "10:00",
      "11:00",
      "14:00",
      "15:00",
      "16:00",
    ];

    const bookedTimes = bookings
      .filter(
        (booking) =>
          booking.date === date &&
          booking.status !== "CANCELLED"
      )
      .map((booking) => booking.time);

    const availableSlots = allSlots.filter(
      (time) => !bookedTimes.includes(time)
    );

    return res.json(availableSlots);
  } catch (error) {
    console.error(
      "Erreur chargement créneaux :",
      error
    );

    return res.status(500).json({
      message: "Impossible de charger les créneaux.",
    });
  }
});

app.get("/api/bookings", requireAdmin, (req, res) => {
  try {
    const bookings = readJson("bookings.json");

    return res.json(bookings);
  } catch (error) {
    console.error(
      "Erreur chargement réservations :",
      error
    );

    return res.status(500).json({
      message: "Impossible de charger les réservations.",
    });
  }
});

app.patch("/api/bookings/:id", requireAdmin, (req, res) => {
  try {
    const bookingId = Number(req.params.id);
    const { status } = req.body;

    const allowedStatuses = [
      "PENDING",
      "CONFIRMED",
      "CANCELLED",
      "COMPLETED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Statut invalide.",
      });
    }

    const bookings = readJson("bookings.json");

    const booking = bookings.find(
      (booking) => booking.id === bookingId
    );

    if (!booking) {
      return res.status(404).json({
        message: "Réservation introuvable.",
      });
    }

    booking.status = status;

    writeJson("bookings.json", bookings);

    return res.json(booking);
  } catch (error) {
    console.error(
      "Erreur modification réservation :",
      error
    );

    return res.status(500).json({
      message: "Impossible de modifier la réservation.",
    });
  }
});

app.post("/api/bookings", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      serviceId,
    } = req.body;

    const bookings = readJson("bookings.json");

    const existingBooking = bookings.find(
      (booking) =>
        booking.date === date &&
        booking.time === time &&
        booking.status !== "CANCELLED"
    );

    if (existingBooking) {
      return res.status(409).json({
        message: "Ce créneau n'est plus disponible.",
      });
    }

    const newBooking = {
      id:
        bookings.length > 0
          ? Math.max(...bookings.map((booking) => booking.id)) + 1
          : 1,

      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      serviceId,
      status: "PENDING",
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);

    writeJson(
      "bookings.json",
      bookings
    );

    try {
      await sendBookingEmails(newBooking);
    } catch (emailError) {
      console.error(
        "Erreur lors de l'envoi des emails :",
        emailError
      );
    }

    return res.status(201).json(newBooking);
  } catch (error) {
    console.error(
      "Erreur création réservation :",
      error
    );

    return res.status(500).json({
      message: "Impossible de créer la réservation.",
    });
  }
});

app.listen(PORT, () => {
  console.log(
    `API disponible sur http://localhost:${PORT}`
  );
});