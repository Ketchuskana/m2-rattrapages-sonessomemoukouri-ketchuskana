import { useBookings } from "../features/admin/hooks/useBookings";
import { useUpdateBookingStatus } from "../features/admin/hooks/useUpdateBookingStatus";

export default function AdminPage() {
  const {
    data: bookings = [],
    isLoading,
    isError,
    refetch,
  } = useBookings();

  const updateStatus =
    useUpdateBookingStatus();

  const confirmedCount =
    bookings.filter(
      (booking) =>
        booking.status === "CONFIRMED"
    ).length;

  const pendingCount =
    bookings.filter(
      (booking) =>
        booking.status === "PENDING"
    ).length;

  if (isLoading) {
    return (
      <div className="container section">
        <div className="state-message">
          Chargement des réservations...
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="container section">
        <div className="state-message error-state">
          <h3>
            Impossible de charger les réservations.
          </h3>

          <button
            className="btn btn-primary"
            onClick={() => refetch()}
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Administration</h1>

          <p>
            Gérez les rendez-vous et suivez
            l'activité.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">

          <div className="admin-grid">
            <div className="stat-card">
              <p>Total</p>
              <h3>{bookings.length}</h3>
            </div>

            <div className="stat-card">
              <p>Confirmés</p>
              <h3>{confirmedCount}</h3>
            </div>

            <div className="stat-card">
              <p>En attente</p>
              <h3>{pendingCount}</h3>
            </div>

            <div className="stat-card">
              <p>Terminés</p>

              <h3>
                {
                  bookings.filter(
                    (booking) =>
                      booking.status ===
                      "COMPLETED"
                  ).length
                }
              </h3>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Date</th>
                  <th>Heure</th>
                  <th>Statut</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>
                      {booking.firstName}{" "}
                      {booking.lastName}
                    </td>

                    <td>{booking.date}</td>

                    <td>{booking.time}</td>

                    <td>
                      <span className="status">
                        {booking.status}
                      </span>
                    </td>

                    <td className="admin-actions">
                      <button
                        className="btn btn-secondary"
                        disabled={
                          updateStatus.isPending
                        }
                        onClick={() =>
                          updateStatus.mutate({
                            bookingId:
                              booking.id,
                            status:
                              "CONFIRMED",
                          })
                        }
                      >
                        Confirmer
                      </button>

                      <button
                        className="btn btn-secondary"
                        disabled={
                          updateStatus.isPending
                        }
                        onClick={() =>
                          updateStatus.mutate({
                            bookingId:
                              booking.id,
                            status:
                              "COMPLETED",
                          })
                        }
                      >
                        Terminer
                      </button>

                      <button
                        className="btn btn-secondary"
                        disabled={
                          updateStatus.isPending
                        }
                        onClick={() =>
                          updateStatus.mutate({
                            bookingId:
                              booking.id,
                            status:
                              "CANCELLED",
                          })
                        }
                      >
                        Annuler
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </section>
    </>
  );
}