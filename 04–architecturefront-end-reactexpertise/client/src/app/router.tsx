import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout";

const HomePage =
  lazy(() => import("../pages/HomePage"));

const ServicesPage =
  lazy(() => import("../pages/ServicesPage"));

const BookingPage =
  lazy(() => import("../pages/BookingPage"));

const CheckoutPage =
  lazy(() => import("../pages/CheckoutPage"));

const ConfirmationPage =
  lazy(
    () =>
      import("../pages/ConfirmationPage")
  );

const AdminPage =
  lazy(() => import("../pages/AdminPage"));

function withSuspense(
  element: React.ReactNode
) {
  return (
    <Suspense
      fallback={
        <div className="container section">
          Chargement...
        </div>
      }
    >
      {element}
    </Suspense>
  );
}  

export const router =
  createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element:
            withSuspense(<HomePage />),
        },
        {
          path: "services",
          element:
            withSuspense(
              <ServicesPage />
            ),
        },
        {
          path: "booking",
          element:
            withSuspense(
              <BookingPage />
            ),
        },
        {
          path: "checkout",
          element:
            withSuspense(
              <CheckoutPage />
            ),
        },
        {
          path: "confirmation",
          element:
            withSuspense(
              <ConfirmationPage />
            ),
        },
        {
          path: "admin",
          element:
            withSuspense(
              <AdminPage />
            ),
        },
      ],
    },
  ]);

