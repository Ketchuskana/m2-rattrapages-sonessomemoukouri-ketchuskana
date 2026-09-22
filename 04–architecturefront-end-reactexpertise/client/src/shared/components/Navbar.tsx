import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <NavLink to="/" className="logo">
          Book<span>Me</span>
        </NavLink>

        <nav className="nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Accueil
          </NavLink>

          <NavLink
            to="/services"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Services
          </NavLink>

          <NavLink
            to="/booking"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Réserver
          </NavLink>

          <NavLink
            to="/admin"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Administration
          </NavLink>
        </nav>

        <NavLink to="/booking" className="btn btn-primary">
          Prendre rendez-vous
        </NavLink>
      </div>
    </header>
  );
}