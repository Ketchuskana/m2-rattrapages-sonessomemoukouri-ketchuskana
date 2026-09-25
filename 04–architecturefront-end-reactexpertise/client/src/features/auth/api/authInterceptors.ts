import { isAxiosError } from "axios";

import { httpClient } from "../../../shared/api/httpClient";
import { useAuthStore } from "../store/authStore";

// Ajoute le jeton admin à chaque requête et déconnecte
// si le serveur le refuse (jeton expiré ou invalide).
// La feature auth se branche sur le client HTTP partagé :
// shared/ n'a pas à connaître l'authentification.
export function setupAuthInterceptors() {
  const requestId =
    httpClient.interceptors.request.use((config) => {
      const { token } = useAuthStore.getState();

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });

  const responseId =
    httpClient.interceptors.response.use(
      (response) => response,
      (error) => {
        if (
          isAxiosError(error) &&
          error.response?.status === 401
        ) {
          useAuthStore.getState().logout();
        }

        return Promise.reject(error);
      }
    );

  return () => {
    httpClient.interceptors.request.eject(requestId);
    httpClient.interceptors.response.eject(responseId);
  };
}
