import ServiceCard from "../features/services/components/ServiceCard";
import { useServices } from "../features/services/hooks/useServices";

export default function ServicesPage() {
  const {
    data: services,
    isLoading,
    isError,
    refetch,
  } = useServices();

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Nos prestations</h1>

          <p>
            Choisissez la formule qui correspond
            à vos besoins.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          {isLoading && (
            <div className="state-message">
              Chargement des prestations...
            </div>
          )}

          {isError && (
            <div className="state-message error-state">
              <h3>Impossible de charger les prestations.</h3>

              <button
                className="btn btn-primary"
                onClick={() => refetch()}
              >
                Réessayer
              </button>
            </div>
          )}

          {services && (
            <div className="services-grid">
              {services.map((service) => (
                <ServiceCard
                  key={service.id}
                  service={service}
                />
              ))}
            </div>
          )}

        </div>
      </section>
    </>
  );
}