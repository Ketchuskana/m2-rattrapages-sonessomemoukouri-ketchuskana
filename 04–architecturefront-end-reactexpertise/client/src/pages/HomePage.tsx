import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-text">
            <h1>
              Vos rendez-vous, <span>simplement.</span>
            </h1>

            <p>
              Réservez votre prestation en quelques clics, choisissez le
              créneau qui vous convient et recevez immédiatement votre
              confirmation.
            </p>

            <div className="hero-actions">
              <Link to="/booking" className="btn btn-primary">
                Réserver maintenant
              </Link>

              <Link to="/services" className="btn btn-secondary">
                Découvrir nos services
              </Link>
            </div>
          </div>

          <div className="hero-card">
            <h3>Votre prochain rendez-vous</h3>
            <p>Une réservation simple et rapide.</p>

            <div className="booking-preview">
              <div className="preview-line">
                <strong>1. Choisissez votre service</strong>
                <span>Consultez nos prestations et nos tarifs.</span>
              </div>

              <div className="preview-line">
                <strong>2. Sélectionnez un créneau</strong>
                <span>Choisissez une date et une heure disponibles.</span>
              </div>

              <div className="preview-line">
                <strong>3. Confirmez votre rendez-vous</strong>
                <span>Recevez votre confirmation directement par email.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Une réservation en 3 étapes</h2>
            <p>
              Une expérience simple pensée pour permettre à vos clients de
              prendre rendez-vous rapidement.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <h3>01 — Choisissez</h3>
              <p className="service-description">
                Consultez les différentes prestations proposées et sélectionnez
                celle qui correspond à votre besoin.
              </p>
            </div>

            <div className="service-card">
              <h3>02 — Planifiez</h3>
              <p className="service-description">
                Sélectionnez une date puis un créneau horaire encore disponible.
              </p>
            </div>

            <div className="service-card">
              <h3>03 — Confirmez</h3>
              <p className="service-description">
                Validez votre réservation et recevez votre récapitulatif par
                email.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}