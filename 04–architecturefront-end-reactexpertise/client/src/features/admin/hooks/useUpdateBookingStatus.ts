import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { updateBookingStatus } from "../api/adminApi";
import type { Booking } from "../../booking/types/booking";

type UpdateStatusPayload = {
  bookingId: number;
  status: Booking["status"];
};

export function useUpdateBookingStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      bookingId,
      status,
    }: UpdateStatusPayload) =>
      updateBookingStatus(bookingId, status),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}