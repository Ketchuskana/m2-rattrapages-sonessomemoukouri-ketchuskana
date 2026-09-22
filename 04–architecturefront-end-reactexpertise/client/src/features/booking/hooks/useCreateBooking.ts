import { useMutation } from "@tanstack/react-query";
import { createBooking } from "../api/bookingApi";

export function useCreateBooking() {
  return useMutation({
    mutationFn: createBooking,
  });
}