import { useMutation } from "@tanstack/react-query";

import { login } from "../api/authApi";
import { useAuthStore } from "../store/authStore";

export function useLogin() {
  const saveSession = useAuthStore(
    (state) => state.login
  );

  return useMutation({
    mutationFn: login,

    onSuccess: ({ token, admin }) => {
      saveSession(token, admin.email);
    },
  });
}
