const { Resend } = require("resend");

const resend = new Resend(
  process.env.RESEND_API_KEY
);

// Avec onboarding@resend.dev, Resend n'envoie qu'à l'adresse du compte.
// Pour écrire aux clients, vérifier un domaine sur Resend et définir EMAIL_FROM.
const emailFrom =
  process.env.EMAIL_FROM ||
  "BookMe <onboarding@resend.dev>";

// Resend ne lève pas d'exception : il renvoie { error }.
async function sendEmail(options, label) {
  try {
    const { error } = await resend.emails.send({
      from: emailFrom,
      ...options,
    });

    if (error) {
      console.error(`Mail ${label} non envoyé :`, error);
    }
  } catch (error) {
    console.error(`Mail ${label} non envoyé :`, error);
  }
}

async function sendBookingEmails(booking) {
  const adminEmail =
    process.env.ADMIN_EMAIL;

  const clientSubject =
    "Confirmation de votre réservation";

  const adminSubject =
    "Nouvelle réservation";

  await sendEmail({
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
  }, "client");

  await sendEmail({
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
  }, "admin");
}

module.exports = {
  sendBookingEmails,
};