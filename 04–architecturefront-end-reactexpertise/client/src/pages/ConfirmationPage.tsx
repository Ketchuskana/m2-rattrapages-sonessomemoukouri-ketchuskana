import { Link } from "react-router-dom";
import { useBookingStore } from "../features/booking/store/bookingStore";

export default function ConfirmationPage() {
  const {
    bookingId,
    serviceName,
    date,
    time,
    deposit,
    resetBooking,
  } = useBookingStore();

  return (
    <>
      <section className="section">
        <div className="container confirmation-container">
          <div className="confirmation-card">
            <div className="confirmation-icon">
              ✓
            </div>

            <h1>Réservation confirmée</h1>

            <p>
              Votre demande de rendez-vous a bien été enregistrée.
            </p>

            {bookingId && (
              <div className="confirmation-details">
                <div className="summary-row">
                  <span>Référence</span>
                  <strong>#{bookingId}</strong>
                </div>

                <div className="summary-row">
                  <span>Prestation</span>
                  <strong>{serviceName}</strong>
                </div>

                <div className="summary-row">
                  <span>Date</span>
                  <strong>{date}</strong>
                </div>

                <div className="summary-row">
                  <span>Heure</span>
                  <strong>{time}</strong>
                </div>

                <div className="summary-row">
                  <span>Acompte</span>
                  <strong>{deposit} €</strong>
                </div>
              </div>
            )}

            <p className="confirmation-email">
              Un email récapitulatif vous sera envoyé après
              validation du paiement.
            </p>

            <Link
              to="/"
              className="btn btn-primary"
              onClick={resetBooking}
            >
              Retour à l'accueil
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}