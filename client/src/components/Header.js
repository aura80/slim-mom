import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import Logo from "./Logo";
import UserInfo from "./UserInfo";
import Navigation from "./Navigation";
import "./Header.css";

const Header = ({ isAuthenticated }) => {
    const location = useLocation();

    return (
      <header className="header">
        <div className="header-content">
          <Logo />
          <div className="header-right">
            <div className="vertical-bar"></div>
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

        {isAuthenticated && <UserInfo />}
        {isAuthenticated && <Navigation />}
      </header>
    );
};

export default Header;

