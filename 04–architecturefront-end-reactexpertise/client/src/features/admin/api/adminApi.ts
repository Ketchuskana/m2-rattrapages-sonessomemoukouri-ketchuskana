import { httpClient } from "../../../shared/api/httpClient";
import type { Booking } from "../../booking/types/booking";

export async function getBookings(): Promise<Booking[]> {
  const response =
    await httpClient.get<Booking[]>("/bookings");

  return response.data;
}

export async function updateBookingStatus(
  bookingId: number,
  status: Booking["status"]
): Promise<Booking> {
  const response =
    await httpClient.patch<Booking>(
      `/bookings/${bookingId}`,
      { status }
    );

  return response.data;
}