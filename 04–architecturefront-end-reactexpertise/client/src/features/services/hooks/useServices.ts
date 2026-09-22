import { useQuery } from "@tanstack/react-query";
import { getServices } from "../api/servicesApi";

export function useServices() {
  return useQuery({
    queryKey: ["services"],
    queryFn: getServices,
  });
}