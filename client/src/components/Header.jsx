import React, { useState } from 'react';

export default function Header({ activeSection, theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: '#about', label: 'About', icon: 'fa-user' },
    { href: '#skill', label: 'Skills', icon: 'fa-laptop-code' },
    { href: '#portfolio', label: 'Projects', icon: 'fa-diagram-project' },
    { href: '#education', label: 'Education', icon: 'fa-graduation-cap' },
    { href: '#contact', label: 'Contact', icon: 'fa-paper-plane' },
  ];

  return (
    <>
      <header className="header-nav">
        <div className="mobile-brand">
          <span>Sujal Rakshe</span>
        </div>

        <nav className="desktop-nav" id="mainNav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav-link ${activeSection === link.href.slice(1) ? 'active' : ''}`}
            >
              <i className={`fa-solid ${link.icon}`}></i> {link.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} title="Toggle Theme">
            <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'}`}></i>
          </button>
          <button 
            className="mobile-hamburger" 
            onClick={() => setMobileOpen(!mobileOpen)} 
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${mobileOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileOpen ? 'open' : ''}`} id="mobileDrawer">
        <nav className="mobile-nav">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMobileOpen(false)}
            >
              <i className={`fa-solid ${link.icon}`}></i> {link.label}
            </a>
          ))}
          <a href="/Sujal_Rakshe_Resume_Updated.pdf" download className="btn btn-primary btn-full mt-10">
            <i className="fa-solid fa-download"></i> Download Resume
          </a>
        </nav>
      </div>
    </>
  );
}
