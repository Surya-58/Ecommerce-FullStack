import React from "react";
import { Link, NavLink } from "react-router-dom";
import { ShoppingCart, Home, LogIn } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar__brand">
        <div className="navbar__logo">
          <ShoppingCart size={21} strokeWidth={2.2} />
        </div>

        <div>
          <h2>QuickCart</h2>
          <span>Admin Portal</span>
        </div>
      </Link>

      <div className="nav-links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link--active" : ""}`
          }
        >
          <Home size={17} />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) =>
            `nav-link ${isActive ? "nav-link--active" : ""}`
          }
        >
          <LogIn size={17} />
          <span>Login</span>
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;