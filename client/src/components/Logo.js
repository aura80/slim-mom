import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';
// import logo1x from "../assets/logo.png";
// import logo2x from "../assets/logo@2x.png";
// import logoSlim from "../assets/logo-slim.svg";
// import logoMom from "../assets/logo-mom.svg";

const Logo = () => {
    return (
      <Link to="/" className="logo">
        <div className="logo-bar">
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            srcSet={`${process.env.PUBLIC_URL}/assets/logo@2x.png 2x`}
            // src={"/slim-mom/assets/logo.png"}
            // srcSet="/slim-mom/assets/logo@2x.png 2x"
            // src={logo1x}
            // srcSet={`${logo1x} 1x, ${logo2x} 2x`}
            alt="SlimMom Logo"
            className="logo-image"
          />
          <div className="logo-text">
            <Link to={"/"}>
              <img
                src={`${process.env.PUBLIC_URL}/assets/logo-slim.svg`}
                // src={"/slim-mom/assets/logo-slim.svg"}
                alt="Slim Logo Left"
                className="logo-slim"
              />
              <img
                src={`${process.env.PUBLIC_URL}/assets/logo-mom.svg`}
                // src={"/slim-mom/assets/logo-mom.svg"}
                alt="Mom Logo Right"
                className="logo-mom"
              />
            </Link>
          </div>
        </div>
      </Link>
    );
};

export default Logo;