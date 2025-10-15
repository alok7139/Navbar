import React, { useState } from 'react';
import './Navbar.css';

const LandingNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="lnb-navbar">
      <div className="lnb-container">
        <div className="lnb-logo">BrandLogo</div>
        <div
          className={`lnb-hamburger ${menuOpen ? 'lnb-hamburger-active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`lnb-menu ${menuOpen ? 'lnb-menu-active' : ''}`}>
          <li className="lnb-item">
            <a href="#home" className="lnb-link">
              Home
            </a>
          </li>
          <li className="lnb-item">
            <a href="#about" className="lnb-link">
              About
            </a>
          </li>
          <li className="lnb-item">
            <a href="#services" className="lnb-link">
              Services
            </a>
          </li>
          <li className="lnb-item">
            <a href="#contact" className="lnb-link">
              Contact
            </a>
          </li>
          <li className="lnb-item">
            <a href="#signup" className="lnb-button">
              Sign Up
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LandingNavbar;
