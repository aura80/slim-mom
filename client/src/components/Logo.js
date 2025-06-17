import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
    return (
      <Link to="/" className="logo">
        <div className="logo-bar">
          <img
            src={`${process.env.PUBLIC_URL}/assets/logo.png`}
            srcSet={`${process.env.PUBLIC_URL}/assets/logo@2x.png 2x`}
            alt="SlimMom Logo"
            className="logo-image"
          />
          <div className="logo-text">
              <img
                src={`${process.env.PUBLIC_URL}/assets/logo-slim.svg`}
                alt="Slim Logo Left"
                className="logo-slim"
              />
              <img
                src={`${process.env.PUBLIC_URL}/assets/logo-mom.svg`}
                alt="Mom Logo Right"
                className="logo-mom"
              />
          </div>
        </div>
      </Link>
    );
};

export default Logo;