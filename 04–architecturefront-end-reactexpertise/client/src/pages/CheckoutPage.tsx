import { Navigate, useNavigate } from "react-router-dom";

import { useBookingStore } from "../features/booking/store/bookingStore";
import { useCreateBooking } from "../features/booking/hooks/useCreateBooking";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const createBookingMutation = useCreateBooking();

  const {
    serviceId,
    serviceName,
    firstName,
    lastName,
    email,
    phone,
    date,
    time,
    price,
    deposit,
    setBookingId,
  } = useBookingStore();

  if (serviceId === null) {
    return <Navigate to="/booking" replace />;
  }

  const validServiceId = serviceId;

  function handlePayment() {
    createBookingMutation.mutate(
      {
        firstName,
        lastName,
        email,
        phone,
        date,
        time,
        serviceId: validServiceId,
      },
      {
        onSuccess: (booking) => {
          setBookingId(booking.id);
          navigate("/confirmation");
        },
      }
    );
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Finaliser votre réservation</h1>

          <p>
            Vérifiez vos informations avant de confirmer
            votre acompte.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container checkout-container">
          <div className="checkout-card">

            <h2>Votre rendez-vous</h2>

            <div className="summary-row">
              <span>Cliente</span>
              <strong>
                {firstName} {lastName}
              </strong>
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
              <span>Acompte</span>
              <strong>{deposit} €</strong>
            </div>

            <div className="summary-row">
              <span>Reste à régler</span>
              <strong>{price - deposit} €</strong>
            </div>

            {createBookingMutation.isError && (
              <div className="api-error">
                Ce créneau n'est plus disponible.
                Veuillez revenir à la réservation
                et choisir une autre heure.
              </div>
            )}

            <div className="checkout-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/booking")}
              >
                Modifier
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handlePayment}
                disabled={createBookingMutation.isPending}
              >
                {createBookingMutation.isPending
                  ? "Validation en cours..."
                  : `Valider l'acompte de ${deposit} €`}
              </button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}