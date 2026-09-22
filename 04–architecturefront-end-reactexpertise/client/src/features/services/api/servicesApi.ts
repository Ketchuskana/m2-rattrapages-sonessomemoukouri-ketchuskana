import { httpClient } from "../../../shared/api/httpClient";
import type { Service } from "../types/service";

export async function getServices(): Promise<Service[]> {
  const response =
    await httpClient.get<Service[]>("/services");

  return response.data;
}