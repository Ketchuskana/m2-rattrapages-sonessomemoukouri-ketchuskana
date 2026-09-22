import { Navigate, useNavigate } from "react-router-dom";
import { useBookingStore } from "../features/booking/store/bookingStore";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const {
    bookingId,
    serviceName,
    date,
    time,
    price,
    deposit,
  } = useBookingStore();

  if (!bookingId) {
    return <Navigate to="/booking" replace />;
  }

  const remainingAmount = price - deposit;

  function handlePayment() {
    console.log("Paiement de l'acompte :", deposit);

    navigate("/confirmation");
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Finaliser votre réservation</h1>

          <p>
            Vérifiez les informations avant de procéder
            au paiement de l'acompte.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container checkout-container">
          <div className="checkout-card">
            <h2>Récapitulatif</h2>

            <div className="summary-row">
              <span>Réservation</span>
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
              <span>Prix total</span>
              <strong>{price} €</strong>
            </div>

            <div className="summary-row">
              <span>Acompte à payer</span>
              <strong>{deposit} €</strong>
            </div>

            <div className="summary-row">
              <span>Reste à payer</span>
              <strong>{remainingAmount} €</strong>
            </div>

            <div className="checkout-actions">
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/booking")}
              >
                Modifier
              </button>

              <button
                className="btn btn-primary"
                onClick={handlePayment}
              >
                Payer l'acompte
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}