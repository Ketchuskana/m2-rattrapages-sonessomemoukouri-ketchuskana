import { createBrowserRouter } from "react-router-dom";

import AppLayout from "./AppLayout";
import HomePage from "../pages/HomePage";
import ServicesPage from "../pages/ServicesPage";
import BookingPage from "../pages/BookingPage";
import CheckoutPage from "../pages/CheckoutPage";
import ConfirmationPage from "../pages/ConfirmationPage";
import AdminPage from "../pages/AdminPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "confirmation",
        element: <ConfirmationPage />,
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);