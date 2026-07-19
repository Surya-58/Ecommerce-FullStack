import React, { use } from "react";
import { NavLink } from "react-router-dom";
import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../Context/UserContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { currentUser, logout } = useContext(UserContext);

  const [showMenu, setShowMenu] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className="navbar">
      <div className="container navbar__top">
        <div className="navbar__logo">
          <div className="navbar__logo-mark"></div>

          <span>QuickCart</span>
        </div>

        <div className="navbar__categories">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "navbar__category-link navbar__category-link--active"
                : "navbar__category-link"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? "navbar__category-link navbar__category-link--active"
                : "navbar__category-link"
            }
          >
            Products
          </NavLink>

          <NavLink
            to="/wishlist"
            className={({ isActive }) =>
              isActive
                ? "navbar__category-link navbar__category-link--active"
                : "navbar__category-link"
            }
          >
            Wishlist
          </NavLink>

          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? "navbar__category-link navbar__category-link--active"
                : "navbar__category-link"
            }
          >
            Cart
          </NavLink>

          <NavLink to="/login" className="navbar__category-link">
            Login
          </NavLink>
        </div>

        <div className="navbar__actions">
          <div className="navbar__profile" ref={menuRef}>
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="navbar__login-btn"
            >
              Account
            </button>

            {showMenu && (
              <div className="account-dropdown">
                <div className="account-dropdown__header">
                  <p>Hello, {currentUser?.name || "Guest"}</p>
                </div>
                <div className="account-dropdown__body">
                  {currentUser ? (
                    <>
                      <Link to="/profile" onClick={() => setShowMenu(false)}>
                        My Profile
                      </Link>

                      <button onClick={() => setShowMenu(false)}>
                        My Orders
                      </button>

                      <button
                        onClick={() => {
                          logout();
                          setShowMenu(false);
                        }}
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" onClick={() => setShowMenu(false)}>
                        Login
                      </Link>

                      <Link to="/register" onClick={() => setShowMenu(false)}>
                        Register
                      </Link>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
