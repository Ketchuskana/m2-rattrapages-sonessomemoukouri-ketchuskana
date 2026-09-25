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

import {
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import CheckoutPage from "./CheckoutPage";
import { useBookingStore } from "../features/booking/store/bookingStore";
import { createBooking } from "../features/booking/api/bookingApi";

vi.mock("../features/booking/api/bookingApi", () => ({
  createBooking: vi.fn(),
}));

const mockedCreateBooking = vi.mocked(createBooking);

function renderCheckout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: { retry: false },
    },
  });

  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/checkout"]}>
        <Routes>
          <Route
            path="/checkout"
            element={<CheckoutPage />}
          />
          <Route
            path="/booking"
            element={<p>Page réservation</p>}
          />
          <Route
            path="/confirmation"
            element={<p>Page confirmation</p>}
          />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  );
}

describe("Parcours de paiement de l'acompte", () => {
  beforeEach(() => {
    mockedCreateBooking.mockReset();

    useBookingStore.getState().resetBooking();

    useBookingStore.getState().setBookingSelection({
      serviceId: 2,
      serviceName: "Coupe + brushing",
      firstName: "Marie",
      lastName: "Dupont",
      email: "marie@example.com",
      phone: "690000000",
      date: "2026-09-30",
      time: "10:00",
      price: 60,
      deposit: 20,
    });
  });

  it("redirige vers la réservation si aucun parcours n'est en cours", () => {
    useBookingStore.getState().resetBooking();

    renderCheckout();

    expect(
      screen.getByText("Page réservation")
    ).toBeInTheDocument();
  });

  it("crée la réservation au clic puis affiche la confirmation", async () => {
    mockedCreateBooking.mockResolvedValue({
      id: 12,
      firstName: "Marie",
      lastName: "Dupont",
      email: "marie@example.com",
      phone: "690000000",
      date: "2026-09-30",
      time: "10:00",
      serviceId: 2,
      status: "PENDING",
    });

    renderCheckout();

    // Rien n'est envoyé au serveur avant la validation.
    expect(mockedCreateBooking).not.toHaveBeenCalled();

    fireEvent.click(
      screen.getByRole("button", {
        name: /valider l'acompte/i,
      })
    );

    expect(
      await screen.findByText("Page confirmation")
    ).toBeInTheDocument();

    expect(mockedCreateBooking).toHaveBeenCalledTimes(1);
    expect(
      useBookingStore.getState().bookingId
    ).toBe(12);
  });

  it("affiche une erreur si le créneau n'est plus disponible", async () => {
    mockedCreateBooking.mockRejectedValue(
      new Error("409")
    );

    renderCheckout();

    fireEvent.click(
      screen.getByRole("button", {
        name: /valider l'acompte/i,
      })
    );

    expect(
      await screen.findByText(
        /ce créneau n'est plus disponible/i
      )
    ).toBeInTheDocument();
  });
});
