import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
import logo1x from "../assets/logo.png";
import logo2x from "../assets/logo@2x.png";
import logoSlim from "../assets/logo-slim.svg";
import logoMom from "../assets/logo-mom.svg";

const Logo = () => {
    return (
      <Link to="/" className="logo">
        <div className="logo-bar">
          <img
            src={logo1x}
            srcSet={`${logo1x} 1x, ${logo2x} 2x`}
            alt="SlimMom Logo"
            className="logo-image"
          />
          <div className="logo-text">
            <img src={logoSlim} alt="Slim Logo Left" className="logo-slim" />
            <img src={logoMom} alt="Mom Logo Right" className="logo-mom" />
          </div>
        </div>
      </Link>
    );
};

export default Logo;