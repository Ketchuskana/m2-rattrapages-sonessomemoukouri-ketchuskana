const bookings = [
  {
    id: 1,
    customer: "Marie Dupont",
    service: "Consultation standard",
    date: "22/09/2026",
    time: "09:00",
    status: "confirmed",
  },
  {
    id: 2,
    customer: "Sandra Mbele",
    service: "Consultation premium",
    date: "22/09/2026",
    time: "11:00",
    status: "pending",
  },
  {
    id: 3,
    customer: "Paul Martin",
    service: "Accompagnement",
    date: "23/09/2026",
    time: "14:00",
    status: "confirmed",
  },
];

export default function AdminPage() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Administration</h1>
          <p>Gérez les rendez-vous et suivez votre activité.</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="admin-grid">
            <div className="stat-card">
              <p>Rendez-vous aujourd'hui</p>
              <h3>8</h3>
            </div>

            <div className="stat-card">
              <p>Cette semaine</p>
              <h3>32</h3>
            </div>

            <div className="stat-card">
              <p>Confirmés</p>
              <h3>27</h3>
            </div>

            <div className="stat-card">
              <p>En attente</p>
              <h3>5</h3>
            </div>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Date</th>
                  <th>Heure</th>
                  <th>Statut</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id}>
                    <td>{booking.customer}</td>
                    <td>{booking.service}</td>
                    <td>{booking.date}</td>
                    <td>{booking.time}</td>

                    <td>
                      <span
                        className={
                          booking.status === "confirmed"
                            ? "status status-confirmed"
                            : "status status-pending"
                        }
                      >
                        {booking.status === "confirmed"
                          ? "Confirmé"
                          : "En attente"}
                      </span>
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