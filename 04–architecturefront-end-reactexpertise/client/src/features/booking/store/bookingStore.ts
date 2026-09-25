import { create } from "zustand";

type BookingState = {
  bookingId: number | null;

  serviceId: number | null;
  serviceName: string;

  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  date: string;
  time: string;

  price: number;
  deposit: number;

  setBookingSelection: (data: {
    serviceId: number;
    serviceName: string;

    firstName: string;
    lastName: string;
    email: string;
    phone: string;

    date: string;
    time: string;

    price: number;
    deposit: number;
  }) => void;

  setBookingId: (bookingId: number) => void;

  resetBooking: () => void;
};

export const useBookingStore = create<BookingState>((set) => ({
  bookingId: null,

  serviceId: null,
  serviceName: "",

  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  date: "",
  time: "",

  price: 0,
  deposit: 0,

  setBookingSelection: (data) =>
    set({
      serviceId: data.serviceId,
      serviceName: data.serviceName,

      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,

      date: data.date,
      time: data.time,

      price: data.price,
      deposit: data.deposit,
    }),

  setBookingId: (bookingId) =>
    set({
      bookingId,
    }),

  resetBooking: () =>
    set({
      bookingId: null,

      serviceId: null,
      serviceName: "",

      firstName: "",
      lastName: "",
      email: "",
      phone: "",

      date: "",
      time: "",

      price: 0,
      deposit: 0,
    }),
}));