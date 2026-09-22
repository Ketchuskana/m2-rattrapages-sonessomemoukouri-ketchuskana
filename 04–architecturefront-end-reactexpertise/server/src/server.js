require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3001;

app.use(cors());

app.use(express.json());

const {
  sendBookingEmails,
} = require("./services/emailService");

const services = [
  {
    id: 1,
    name: "Consultation standard",
    description:
      "Un rendez-vous personnalisé pour échanger sur vos besoins.",
    duration: 30,
    price: 25,
    deposit: 10,
  },

  {
    id: 2,
    name: "Consultation premium",
    description:
      "Une session approfondie avec davantage de temps et de suivi.",
    duration: 60,
    price: 45,
    deposit: 15,
  },

  {
    id: 3,
    name: "Accompagnement",
    description:
      "Une prestation complète avec suivi personnalisé.",
    duration: 90,
    price: 70,
    deposit: 20,
  },
];

app.get("/api/services", (req, res) => {
  res.json(services);
});

const bookings = [];

app.get("/api/slots", (req, res) => {
  const { date } = req.query;

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

  res.json(availableSlots);
});

app.get("/api/bookings", (req, res) => {
  res.json(bookings);
});

app.patch("/api/bookings/:id", (req, res) => {
  const bookingId = Number(req.params.id);
  const { status } = req.body;

  const booking = bookings.find(
    (booking) => booking.id === bookingId
  );

  if (!booking) {
    return res.status(404).json({
      message: "Réservation introuvable.",
    });
  }

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

  booking.status = status;

  res.json(booking);
});

app.post("/api/bookings", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    date,
    time,
    serviceId,
  } = req.body;

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
    id: bookings.length + 1,
    firstName,
    lastName,
    email,
    phone,
    date,
    time,
    serviceId,
    status: "PENDING",
  };

  // 1. On enregistre d'abord la réservation
  bookings.push(newBooking);

  // 2. Puis on tente d'envoyer les emails
  try {
    await sendBookingEmails(newBooking);
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi des emails :",
      error
    );
  }

  // 3. La réservation reste créée même si l'email échoue
  return res.status(201).json(newBooking);
});

app.listen(PORT, () => {
  console.log(
    `API disponible sur http://localhost:${PORT}`
  );
});