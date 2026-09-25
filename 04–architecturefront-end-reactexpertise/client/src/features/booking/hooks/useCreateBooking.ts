import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { createBooking } from "../api/bookingApi";

export function useCreateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBooking,

    // Le créneau réservé ne doit plus apparaître comme libre,
    // et la nouvelle réservation doit être visible côté admin.
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["slots"],
      });

      queryClient.invalidateQueries({
        queryKey: ["bookings"],
      });
    },
  });
}
