import { create } from "zustand";

type BookingSelection = {
  bookingId: number | null;
  serviceId: number | null;
  serviceName: string;
  date: string;
  time: string;
  price: number;
  deposit: number;

  setBookingSelection: (data: {
    bookingId: number;
    serviceId: number;
    serviceName: string;
    date: string;
    time: string;
    price: number;
    deposit: number;
  }) => void;

  resetBooking: () => void;
};

export const useBookingStore = create<BookingSelection>((set) => ({
  bookingId: null,
  serviceId: null,
  serviceName: "",
  date: "",
  time: "",
  price: 0,
  deposit: 0,

  setBookingSelection: (data) =>
    set({
      bookingId: data.bookingId,
      serviceId: data.serviceId,
      serviceName: data.serviceName,
      date: data.date,
      time: data.time,
      price: data.price,
      deposit: data.deposit,
    }),

  resetBooking: () =>
    set({
      bookingId: null,
      serviceId: null,
      serviceName: "",
      date: "",
      time: "",
      price: 0,
      deposit: 0,
    }),
}));