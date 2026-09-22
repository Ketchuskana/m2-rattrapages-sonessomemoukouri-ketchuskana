const express = require("express");
const cors = require("cors");

const app = express();

const PORT = 3001;

app.use(cors());

app.use(express.json());

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

app.post("/api/bookings", (req, res) => {
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

  bookings.push(newBooking);

  res.status(201).json(newBooking);
});

app.listen(PORT, () => {
  console.log(
    `API disponible sur http://localhost:${PORT}`
  );
});