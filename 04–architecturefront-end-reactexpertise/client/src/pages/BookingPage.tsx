import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useServices } from "../features/services/hooks/useServices";

import { useAvailableSlots } from "../features/booking/hooks/useAvailableSlots";
import { useCreateBooking } from "../features/booking/hooks/useCreateBooking";

import TimeSlots from "../features/booking/components/TimeSlots";
import BookingSummary from "../features/booking/components/BookingSummary";
import BookingForm from "../features/booking/components/BookingForm";
import { useBookingStore } from "../features/booking/store/bookingStore";

import type { BookingFormData } from "../features/booking/schemas/bookingSchema";

export default function BookingPage() {
  const navigate = useNavigate();

  const [selectedServiceId, setSelectedServiceId] =
    useState<number | null>(null);

  const [selectedDate, setSelectedDate] =
    useState("");

  const [selectedTime, setSelectedTime] =
    useState("");

  const {
    data: services = [],
    isLoading: servicesLoading,
  } = useServices();

  const {
    data: slots = [],
    isLoading: slotsLoading,
  } = useAvailableSlots(selectedDate);

  const createBookingMutation =
    useCreateBooking();

  const selectedService = services.find(
    (service) =>
      service.id === selectedServiceId
  );

  const setBookingSelection =
  useBookingStore((state) => state.setBookingSelection);

  function handleServiceChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const value = Number(event.target.value);

    setSelectedServiceId(
      value || null
    );

    setSelectedTime("");
  }

  function handleDateChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setSelectedDate(event.target.value);
    setSelectedTime("");
  }

  function handleBookingSubmit(
    data: BookingFormData
  ) {
    createBookingMutation.mutate(
      data,
      {
        onSuccess: (booking) => {
        if (!selectedService) {
            return;
        }

        setBookingSelection({
            bookingId: booking.id,
            serviceId: selectedService.id,
            serviceName: selectedService.name,
            date: selectedDate,
            time: selectedTime,
            price: selectedService.price,
            deposit: selectedService.deposit,
        });

        navigate("/checkout");
        },
      }
    );
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Prendre rendez-vous</h1>

          <p>
            Choisissez votre prestation,
            une date et un créneau disponible.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container booking-layout">

          <div className="booking-card">

            <h2>Votre rendez-vous</h2>

            <div className="form-group">
              <label htmlFor="service">
                Prestation
              </label>

              <select
                id="service"
                className="form-control"
                value={selectedServiceId ?? ""}
                onChange={handleServiceChange}
                disabled={servicesLoading}
              >
                <option value="">
                  Choisir une prestation
                </option>

                {services.map((service) => (
                  <option
                    key={service.id}
                    value={service.id}
                  >
                    {service.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="date">
                Date
              </label>

              <input
                id="date"
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={handleDateChange}
              />
            </div>

            <div className="form-group">
              <label>
                Créneau disponible
              </label>

              {!selectedDate ? (
                <div className="state-message">
                  Choisissez d'abord une date.
                </div>
              ) : (
                <TimeSlots
                  slots={slots}
                  selectedTime={selectedTime}
                  onSelectTime={setSelectedTime}
                  isLoading={slotsLoading}
                />
              )}
            </div>

            <hr />

            <h2>Vos informations</h2>

            <BookingForm
              serviceId={selectedServiceId}
              date={selectedDate}
              time={selectedTime}
              onSubmitBooking={handleBookingSubmit}
              isSubmitting={
                createBookingMutation.isPending
              }
            />

            {createBookingMutation.isError && (
              <div className="api-error">
                Impossible de créer la réservation.
                Le créneau est peut-être déjà pris.
              </div>
            )}

          </div>

          <BookingSummary
            serviceName={selectedService?.name}
            duration={selectedService?.duration}
            price={selectedService?.price}
            deposit={selectedService?.deposit}
            date={selectedDate}
            time={selectedTime}
          />

        </div>
      </section>
    </>
  );
}