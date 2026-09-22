import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  bookingSchema,
  type BookingFormData,
} from "../schemas/bookingSchema";

type BookingFormProps = {
  serviceId: number | null;
  date: string;
  time: string;
  onSubmitBooking: (data: BookingFormData) => void;
  isSubmitting?: boolean;
};

export default function BookingForm({
  serviceId,
  date,
  time,
  onSubmitBooking,
  isSubmitting = false,
}: BookingFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date,
      time,
      serviceId: serviceId ?? 0,
    },
    values: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      date,
      time,
      serviceId: serviceId ?? 0,
    },
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmitBooking)}
      className="booking-form"
    >
      <div className="form-group">
        <label htmlFor="firstName">Prénom</label>

        <input
          id="firstName"
          className="form-control"
          placeholder="Votre prénom"
          {...register("firstName")}
        />

        {errors.firstName && (
          <p className="form-error">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="lastName">Nom</label>

        <input
          id="lastName"
          className="form-control"
          placeholder="Votre nom"
          {...register("lastName")}
        />

        {errors.lastName && (
          <p className="form-error">
            {errors.lastName.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>

        <input
          id="email"
          type="email"
          className="form-control"
          placeholder="vous@email.com"
          {...register("email")}
        />

        {errors.email && (
          <p className="form-error">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Téléphone</label>

        <input
          id="phone"
          className="form-control"
          placeholder="+237 6..."
          {...register("phone")}
        />

        {errors.phone && (
          <p className="form-error">
            {errors.phone.message}
          </p>
        )}
      </div>

      <input
        type="hidden"
        value={date}
        {...register("date")}
      />

      <input
        type="hidden"
        value={time}
        {...register("time")}
      />

      <input
        type="hidden"
        value={serviceId ?? 0}
        {...register("serviceId", {
          valueAsNumber: true,
        })}
      />

      {errors.date && (
        <p className="form-error">
          {errors.date.message}
        </p>
      )}

      {errors.time && (
        <p className="form-error">
          {errors.time.message}
        </p>
      )}

      {errors.serviceId && (
        <p className="form-error">
          {errors.serviceId.message}
        </p>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting
          ? "Réservation en cours..."
          : "Continuer vers le paiement"}
      </button>
    </form>
  );
}