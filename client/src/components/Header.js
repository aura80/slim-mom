import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { AuthContext } from "../context/AuthContext";
import { logoutUser } from "../utils/api";
import "./Header.css";

const Header = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();
    
    const handleBurgerClick = () => {
      setMenuOpen(prev => !prev);
    }
  
    const handleLogout = async () => {
      try {
        await logoutUser();  // call to backend API
        logout();   // call to frontend context
      } catch (error) {
        console.error("Logout failed: ", error.message);
      }
    }

    return (
      <header className="header">
        <div className="header-content">
          <Logo />
          <div className="header-right">
            <div className="vertical-bar"></div>
            {isAuthenticated && (
              <div className="user-desktop-diary">
                <NavLink
                  to={"/diary"}
                  className="diary"
                  onClick={() => setMenuOpen(false)}
                >
                  diary
                </NavLink>
                <NavLink
                  to={"/calculator"}
                  className="diary"
                  onClick={() => setMenuOpen(false)}
                >
                  calculator
                </NavLink>
              </div>
            )}

            {isAuthenticated && (
              <div className="header-user-overlay">
                <span className="username">{user.name}</span>
                <div className="vertical-user-bar"></div>
                <button className="logout-button" onClick={handleLogout}>
                  Exit
                </button>
              </div>
            )}
            {isAuthenticated && (
              <button className="burger-btn" onClick={handleBurgerClick}>
                <img
                  src={`${process.env.PUBLIC_URL}/assets/burger.svg`}
                  // src={"/slim-mom/assets/burger.svg"}
                  alt="Burger Button"
                  className="burger"
                />
              </button>
            )}

            {menuOpen && isAuthenticated && (
              <div className="burger-menu">
                <NavLink to={"/"} onClick={() => setMenuOpen(false)}>
                  Home Page
                </NavLink>
                <NavLink to={"/userpage"} onClick={() => setMenuOpen(false)}>
                  User Page
                </NavLink>
                <button
                  onClick={async () => {
                    await fetch("/logout", {
                      method: "POST",
                      credentials: "include",
                    });
                    setMenuOpen(false);
                    logout();
                    navigate("/login");
                  }}
                  className="logout-btn"
                >
                  Exit
                </button>
              </div>
            )}
          </div>

          {!isAuthenticated && (
            <div className="auth-buttons">
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  isActive ? "btn-login active" : "btn-login"
                }
              >
                LOG IN
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  isActive ? "btn-register active" : "btn-register"
                }
              >
                REGISTRATION
              </NavLink>
            </div>
          )}
        </div>
      </header>
    );
};

export default Header;

