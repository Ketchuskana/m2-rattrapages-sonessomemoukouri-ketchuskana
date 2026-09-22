import { Link } from "react-router-dom";

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
      "Une prestation complète avec suivi personnalisé après le rendez-vous.",
    duration: 90,
    price: 70,
    deposit: 20,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Nos prestations</h1>
          <p>Choisissez la formule qui correspond à vos besoins.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card" key={service.id}>
                <h3>{service.name}</h3>

                <p className="service-description">
                  {service.description}
                </p>

                <div className="service-meta">
                  <span>{service.duration} min</span>
                  <span>Acompte : {service.deposit} €</span>
                </div>

                <p className="service-price">{service.price} €</p>

                <Link to="/booking" className="btn btn-primary">
                  Réserver
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}