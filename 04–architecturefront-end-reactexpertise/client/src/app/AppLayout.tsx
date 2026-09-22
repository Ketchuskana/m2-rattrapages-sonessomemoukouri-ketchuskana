import { Outlet } from "react-router-dom";
import Navbar from "../shared/components/Navbar";
import Footer from "../shared/components/Footer";

export default function AppLayout() {
  return (
    <div className="app-layout">
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}