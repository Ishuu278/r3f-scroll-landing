import React, { useState, useEffect, useCallback } from 'react';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = useCallback(() => setIsOpen((prev) => !prev), []);

  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <nav className={`navbar-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-content">
        <a href="#hero" className="navbar-logo" onClick={(e) => handleLinkClick(e, 'hero')}>
          SWAPNA SAHANI<span>.</span>
        </a>

        {/* Mobile Hamburger Button */}
        <button className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={toggleMenu} aria-label="Toggle Navigation">
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation Links */}
        <ul className={`nav-menu ${isOpen ? 'open' : ''}`}>
          <li className="nav-item">
            <a href="#hero" className="nav-link" onClick={(e) => handleLinkClick(e, 'hero')}>
              Home
            </a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link" onClick={(e) => handleLinkClick(e, 'about')}>
              About
            </a>
          </li>
          <li className="nav-item">
            <a href="#skills" className="nav-link" onClick={(e) => handleLinkClick(e, 'skills')}>
              Skills
            </a>
          </li>
          <li className="nav-item">
            <a href="#projects" className="nav-link" onClick={(e) => handleLinkClick(e, 'projects')}>
              Projects
            </a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link" onClick={(e) => handleLinkClick(e, 'contact')}>
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
