import { httpClient } from "../../../shared/api/httpClient";

import type {
  LoginCredentials,
  LoginResponse,
} from "../types/auth";

export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  const response =
    await httpClient.post<LoginResponse>(
      "/auth/login",
      credentials
    );

  return response.data;
}
