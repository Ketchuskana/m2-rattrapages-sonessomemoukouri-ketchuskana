import { useQuery } from "@tanstack/react-query";
import { getAvailableSlots } from "../api/bookingApi";

export function useAvailableSlots(date: string) {
  return useQuery({
    queryKey: ["slots", date],
    queryFn: () => getAvailableSlots(date),
    enabled: Boolean(date),
  });
}