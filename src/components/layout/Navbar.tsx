'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import MobileMenu from './MobileMenu';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Plots', href: '/plots' },
    { 
      label: 'Projects', 
      dropdown: [
        { label: 'All Projects', href: '/projects' },
        { label: 'Holy Family Township', href: '/projects/holy-family-township' },
        { label: 'Dudhola Farm House', href: '/projects/dudhola-farm-house' },
        { label: 'Garhi Saamstipur', href: '/projects/garhi-saamstipur-phase-3-1' }
      ]
    },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Map', href: '/#map' },
    { label: 'About', href: '/#about' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : 'hero-visible'}`}>
        <div className="navbar-inner container">
          <Link href="/" className="navbar-logo">
            AKS<span>Infinity</span>
          </Link>

          <nav className="navbar-nav">
            {navLinks.map((link) => (
              <React.Fragment key={link.label}>
                {link.href ? (
                  <Link href={link.href} className="navbar-link">
                    {link.label}
                  </Link>
                ) : (
                  <div className="navbar-dropdown navbar-link">
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      {link.label}
                      <ChevronDown size={14} style={{ opacity: 0.8 }} />
                    </span>
                    <div className="navbar-dropdown-content">
                      {link.dropdown?.map(sub => (
                        <Link key={sub.label} href={sub.href} className="dropdown-link">
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </nav>

          <div className="navbar-actions">
            <ThemeToggle />

            <Link href="/#contact" className="btn btn-secondary navbar-cta">
              Book a Site Visit
            </Link>

            <button 
              className={`menu-toggle ${isMobileMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        links={navLinks}
      />
    </>
  );
};

export default Navbar;
