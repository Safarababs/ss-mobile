import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" className="logo-link">
            SS Mobiles
          </Link>
        </div>
        <button className="menu-button" onClick={toggleMenu}>
          <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}></div>
          <div className={`menu-icon ${isMenuOpen ? "open" : ""}`}></div>
        </button>
        <nav className={`nav ${isMenuOpen ? "nav-open" : ""}`}>
          <ul>
            <li>
              <Link to="/inventory" onClick={toggleMenu}>
                Inventory
              </Link>
            </li>
            <li>
              <Link to="/invoice" onClick={toggleMenu}>
                Invoice
              </Link>
            </li>

            <li>
              <Link to="/sales-summary" onClick={toggleMenu}>
                Sales Summary
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
