import React, { useState } from 'react';
import './HamburgerMenu.css'; // or use styled-components

export default function HamburgerMenu({ theme = 'dark' }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('menu-overlay')) setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${theme}`}>
      <div className="navbar-content">
        <span className="logo">PLINK</span>
        {/* Other nav items */}
        <button
          className="hamburger"
          aria-label="Open menu"
          onClick={() => setIsMenuOpen(true)}
        >
          &#9776;
        </button>
      </div>
      {isMenuOpen && (
        <div className="menu-overlay" onClick={handleOverlayClick}>
          <div className="menu-content">
            <button
              className="close-btn"
              aria-label="Close menu"
              onClick={() => setIsMenuOpen(false)}
            >
              &times;
            </button>
            {/* Menu Items */}
            <div className="wallet">Wallet <b>$1250.75</b></div>
            <ul>
              <li>Profile</li>
              <li>Favorites</li>
              <li>Invite</li>
              <li>Settings</li>
              <li>FAQ</li>
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}