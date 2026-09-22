import { httpClient } from "../../../shared/api/httpClient";

import type {
  Booking,
  CreateBookingPayload,
} from "../types/booking";

export async function createBooking(
  payload: CreateBookingPayload
): Promise<Booking> {
  const response =
    await httpClient.post<Booking>(
      "/bookings",
      payload
    );

  return response.data;
}

export async function getAvailableSlots(
  date: string
): Promise<string[]> {
  const response =
    await httpClient.get<string[]>(
      "/slots",
      {
        params: {
          date,
        },
      }
    );

  return response.data;
}