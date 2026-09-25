import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthState = {
  token: string | null;
  email: string;

  login: (token: string, email: string) => void;
  logout: () => void;
};

// Persisté pour que la session admin survive
// à un rechargement de la page.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: "",

      login: (token, email) =>
        set({
          token,
          email,
        }),

      logout: () =>
        set({
          token: null,
          email: "",
        }),
    }),
    {
      name: "bookme-admin-session",
    }
  )
);
