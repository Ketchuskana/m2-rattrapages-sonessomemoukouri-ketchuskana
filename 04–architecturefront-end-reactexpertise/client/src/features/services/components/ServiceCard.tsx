import { Link } from "react-router-dom";
import type { Service } from "../types/service";

type ServiceCardProps = {
  service: Service;
};

export default function ServiceCard({
  service,
}: ServiceCardProps) {
  return (
    <article className="service-card">
      <h3>{service.name}</h3>

      <p className="service-description">
        {service.description}
      </p>

      <div className="service-meta">
        <span>{service.duration} min</span>

        <span>
          Acompte : {service.deposit} €
        </span>
      </div>

      <p className="service-price">
        {service.price} €
      </p>

      <Link
        to={`/booking?service=${service.id}`}
        className="btn btn-primary"
      >
        Réserver
      </Link>
    </article>
  );
}