const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

async function sendBookingEmails(booking) {
  const adminEmail =
    process.env.ADMIN_EMAIL;

  const clientSubject =
    "Confirmation de votre réservation";

  const adminSubject =
    "Nouvelle réservation";

  await resend.emails.send({
    from: "BookMe <onboarding@resend.dev>",
    to: booking.email,
    subject: clientSubject,
    html: `
      <h2>Votre réservation est enregistrée</h2>

      <p>Bonjour ${booking.firstName},</p>

      <p>
        Votre rendez-vous a bien été enregistré.
      </p>

      <p>
        <strong>Date :</strong>
        ${booking.date}
      </p>

      <p>
        <strong>Heure :</strong>
        ${booking.time}
      </p>

      <p>
        <strong>Référence :</strong>
        RDV-${booking.id}
      </p>
    `,
  });

  await resend.emails.send({
    from: "BookMe <onboarding@resend.dev>",
    to: adminEmail,
    subject: adminSubject,
    html: `
      <h2>Nouvelle réservation</h2>

      <p>
        <strong>Client :</strong>
        ${booking.firstName}
        ${booking.lastName}
      </p>

      <p>
        <strong>Email :</strong>
        ${booking.email}
      </p>

      <p>
        <strong>Téléphone :</strong>
        ${booking.phone}
      </p>

      <p>
        <strong>Date :</strong>
        ${booking.date}
      </p>

      <p>
        <strong>Heure :</strong>
        ${booking.time}
      </p>

      <p>
        <strong>Référence :</strong>
        RDV-${booking.id}
      </p>
    `,
  });
}

module.exports = {
  sendBookingEmails,
};