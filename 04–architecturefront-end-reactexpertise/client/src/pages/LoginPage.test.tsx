import {
  fireEvent,
  render,
  screen,
} from "@testing-library/react";

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

import {
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";

import { AxiosError, type AxiosResponse } from "axios";

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import LoginPage from "./LoginPage";
import ProtectedRoute from "../features/auth/components/ProtectedRoute";
import { useAuthStore } from "../features/auth/store/authStore";
import { login } from "../features/auth/api/authApi";

vi.mock("../features/auth/api/authApi", () => ({
  login: vi.fn(),
}));

const mockedLogin = vi.mocked(login);

function renderApp(initialPath: string) {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route
            path="/admin/login"
            element={<LoginPage />}
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin"
              element={<p>Tableau de bord admin</p>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

function fillAndSubmit(email: string, password: string) {
  fireEvent.change(screen.getByLabelText("Email"), {
    target: { value: email },
  });

  fireEvent.change(
    screen.getByLabelText("Mot de passe"),
    { target: { value: password } }
  );

  fireEvent.click(
    screen.getByRole("button", {
      name: "Se connecter",
    })
  );
}

describe("Accès à l'administration", () => {
  beforeEach(() => {
    mockedLogin.mockReset();
    useAuthStore.getState().logout();
  });

  it("redirige vers la connexion si l'admin n'est pas connecté", () => {
    renderApp("/admin");

    expect(
      screen.getByRole("button", {
        name: "Se connecter",
      })
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Tableau de bord admin")
    ).not.toBeInTheDocument();
  });

  it("donne accès à la page admin avec une session active", () => {
    useAuthStore
      .getState()
      .login("jeton", "admin@exemple.com");

    renderApp("/admin");

    expect(
      screen.getByText("Tableau de bord admin")
    ).toBeInTheDocument();
  });

  it("valide le formulaire avant d'appeler l'API", async () => {
    renderApp("/admin/login");

    fillAndSubmit("pas-un-email", "");

    expect(
      await screen.findByText("Adresse email invalide")
    ).toBeInTheDocument();

    expect(mockedLogin).not.toHaveBeenCalled();
  });

  it("connecte l'admin puis ouvre le tableau de bord", async () => {
    mockedLogin.mockResolvedValue({
      token: "jeton-valide",
      admin: {
        id: 1,
        email: "admin@exemple.com",
      },
    });

    renderApp("/admin");

    fillAndSubmit("admin@exemple.com", "motdepasse123");

    expect(
      await screen.findByText("Tableau de bord admin")
    ).toBeInTheDocument();

    expect(mockedLogin.mock.calls[0][0]).toEqual({
      email: "admin@exemple.com",
      password: "motdepasse123",
    });

    expect(useAuthStore.getState().token).toBe(
      "jeton-valide"
    );
  });

  it("affiche une erreur si les identifiants sont faux", async () => {
    mockedLogin.mockRejectedValue(
      new AxiosError(
        "Unauthorized",
        "401",
        undefined,
        undefined,
        { status: 401 } as AxiosResponse
      )
    );

    renderApp("/admin/login");

    fillAndSubmit("admin@exemple.com", "mauvais");

    expect(
      await screen.findByText(
        "Email ou mot de passe incorrect."
      )
    ).toBeInTheDocument();

    expect(useAuthStore.getState().token).toBeNull();
  });
});
