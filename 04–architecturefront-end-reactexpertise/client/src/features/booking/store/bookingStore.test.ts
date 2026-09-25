import {
  beforeEach,
  describe,
  expect,
  it,
} from "vitest";

import { useBookingStore } from "./bookingStore";

const selection = {
  serviceId: 2,
  serviceName: "Coupe + brushing",
  firstName: "Marie",
  lastName: "Dupont",
  email: "marie@example.com",
  phone: "690000000",
  date: "2026-09-30",
  time: "10:00",
  price: 60,
  deposit: 20,
};

describe("bookingStore", () => {
  beforeEach(() => {
    useBookingStore.getState().resetBooking();
  });

  it("garde la sélection sans créer de réservation", () => {
    useBookingStore
      .getState()
      .setBookingSelection(selection);

    const state = useBookingStore.getState();

    expect(state.serviceId).toBe(2);
    expect(state.time).toBe("10:00");
    expect(state.deposit).toBe(20);
    expect(state.bookingId).toBeNull();
  });

  it("enregistre l'identifiant après validation", () => {
    useBookingStore
      .getState()
      .setBookingSelection(selection);

    useBookingStore.getState().setBookingId(7);

    expect(
      useBookingStore.getState().bookingId
    ).toBe(7);
  });

  it("réinitialise tout le parcours", () => {
    useBookingStore
      .getState()
      .setBookingSelection(selection);

    useBookingStore.getState().setBookingId(7);
    useBookingStore.getState().resetBooking();

    const state = useBookingStore.getState();

    expect(state.serviceId).toBeNull();
    expect(state.bookingId).toBeNull();
    expect(state.email).toBe("");
  });
});
