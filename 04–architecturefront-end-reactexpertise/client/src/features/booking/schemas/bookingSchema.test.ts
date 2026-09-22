import {
  describe,
  expect,
  it,
} from "vitest";

import { bookingSchema } from "./bookingSchema";

describe("bookingSchema", () => {
  it("refuse un email invalide", () => {
    const result =
      bookingSchema.safeParse({
        firstName: "Marie",
        lastName: "Dupont",
        email: "mauvais-email",
        phone: "690000000",
        date: "2026-09-30",
        time: "10:00",
        serviceId: 1,
      });

    expect(result.success).toBe(false);
  });

  it("accepte une réservation valide", () => {
    const result =
      bookingSchema.safeParse({
        firstName: "Marie",
        lastName: "Dupont",
        email: "marie@example.com",
        phone: "690000000",
        date: "2026-09-30",
        time: "10:00",
        serviceId: 1,
      });

    expect(result.success).toBe(true);
  });
});