import { useState } from "react";

const availableSlots = [
  "09:00",
  "10:00",
  "11:00",
  "14:00",
  "15:00",
  "16:00",
];

export default function BookingPage() {
  const [selectedTime, setSelectedTime] = useState("");

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Prendre rendez-vous</h1>
          <p>Choisissez votre date, votre heure et renseignez vos informations.</p>
        </div>
      </section>

      <section className="section">
        <div className="container booking-layout">
          <div className="booking-card">
            <h2>Votre rendez-vous</h2>

            <div className="form-group">
              <label htmlFor="service">Prestation</label>

              <select id="service" className="form-control">
                <option>Consultation standard</option>
                <option>Consultation premium</option>
                <option>Accompagnement</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>

              <input
                id="date"
                type="date"
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label>Heure disponible</label>

              <div className="time-slots">
                {availableSlots.map((time) => (
                  <button
                    type="button"
                    key={time}
                    className={
                      selectedTime === time
                        ? "time-slot selected"
                        : "time-slot"
                    }
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="firstName">Prénom</label>
              <input
                id="firstName"
                className="form-control"
                placeholder="Votre prénom"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="vous@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Téléphone</label>
              <input
                id="phone"
                className="form-control"
                placeholder="+237 ..."
              />
            </div>

            <button className="btn btn-primary">
              Continuer
            </button>
          </div>

          <aside className="booking-card booking-summary">
            <h3>Récapitulatif</h3>

            <div className="summary-row">
              <span>Service</span>
              <strong>Consultation</strong>
            </div>

            <div className="summary-row">
              <span>Durée</span>
              <strong>30 min</strong>
            </div>

            <div className="summary-row">
              <span>Heure</span>
              <strong>{selectedTime || "—"}</strong>
            </div>

            <div className="summary-row">
              <span>Prix</span>
              <strong>25 €</strong>
            </div>

            <div className="summary-row">
              <span>Acompte</span>
              <strong>10 €</strong>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}