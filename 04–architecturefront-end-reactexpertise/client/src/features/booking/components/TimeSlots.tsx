type TimeSlotsProps = {
  slots: string[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
  isLoading?: boolean;
};

export default function TimeSlots({
  slots,
  selectedTime,
  onSelectTime,
  isLoading = false,
}: TimeSlotsProps) {
  if (isLoading) {
    return (
      <div className="state-message">
        Chargement des créneaux...
      </div>
    );
  }

  if (slots.length === 0) {
    return (
      <div className="state-message">
        Aucun créneau disponible pour cette date.
      </div>
    );
  }

  return (
    <div className="time-slots">
      {slots.map((time) => (
        <button
          key={time}
          type="button"
          className={
            selectedTime === time
              ? "time-slot selected"
              : "time-slot"
          }
          onClick={() => onSelectTime(time)}
        >
          {time}
        </button>
      ))}
    </div>
  );
}