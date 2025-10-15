import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./LandingNavbar.css";
import logoImg from "./logo.png"; // Replace with your logo path

const LandingNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="lnb-navbar">
      <div className="lnb-container">
        <Link to="/" className="lnb-logo">
          <img src={logoImg} alt="Brand Logo" className="lnb-logo-img" />
        </Link>
        <div
          className={`lnb-hamburger ${menuOpen ? "lnb-hamburger-active" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
        <ul className={`lnb-menu ${menuOpen ? "lnb-menu-active" : ""}`}>
          <li className="lnb-item">
            <Link to="/" className="lnb-link">
              Home
            </Link>
          </li>
          <li className="lnb-item">
            <Link to="/about" className="lnb-link">
              About
            </Link>
          </li>
          <li className="lnb-item">
            <Link to="/services" className="lnb-link">
              Services
            </Link>
          </li>
          <li className="lnb-item">
            <Link to="/contact" className="lnb-link">
              Contact
            </Link>
          </li>
          <li className="lnb-item">
            <Link to="/signup" className="lnb-button">
              Sign Up
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default LandingNavbar;

