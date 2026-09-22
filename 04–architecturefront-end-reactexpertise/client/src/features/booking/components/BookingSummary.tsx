type BookingSummaryProps = {
  serviceName?: string;
  duration?: number;
  price?: number;
  deposit?: number;
  date?: string;
  time?: string;
};

export default function BookingSummary({
  serviceName = "Aucune prestation",
  duration = 0,
  price = 0,
  deposit = 0,
  date = "",
  time = "",
}: BookingSummaryProps) {
  return (
    <aside className="booking-card booking-summary">
      <h3>Récapitulatif</h3>

      <div className="summary-row">
        <span>Prestation</span>
        <strong>{serviceName}</strong>
      </div>

      <div className="summary-row">
        <span>Durée</span>
        <strong>
          {duration > 0 ? `${duration} min` : "—"}
        </strong>
      </div>

      <div className="summary-row">
        <span>Date</span>
        <strong>{date || "—"}</strong>
      </div>

      <div className="summary-row">
        <span>Heure</span>
        <strong>{time || "—"}</strong>
      </div>

      <div className="summary-row">
        <span>Prix</span>
        <strong>
          {price > 0 ? `${price} €` : "—"}
        </strong>
      </div>

      <div className="summary-row">
        <span>Acompte</span>
        <strong>
          {deposit > 0 ? `${deposit} €` : "—"}
        </strong>
      </div>
    </aside>
  );
}